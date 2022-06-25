import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from './TablePaginationAction.tsx';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import { useThemeValue } from '../context/ThemeValueContext';
import { Box, Typography } from '@mui/material';
import { useFetch } from '../hooks/useFetch.ts';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { uploadTable } from '../store/action';
export default function TableCustom() {
  const queryString = window.location.search;
  const data = useSelector<object>((state) => state.table);
  const { setMode, mode } = useThemeValue();
  function searchParams(param: string) {
    const urlParams = new URLSearchParams(queryString);
    return Number(urlParams.get(param));
  }
  const [page, setPage] = useState<number>(
    searchParams('page') ? searchParams('page') - 1 : 0
  );
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    searchParams('per_page') ? searchParams('per_page') : 5
  );
  const naviogate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    naviogate(`../?page=${newPage + 1}&per_page=${rowsPerPage}&id=${filter}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    naviogate(
      `../?page=${page + 1}&per_page=${event.target.value}&id=${filter}`
    );
    setPage(0);
  };
  const [filter, setFilter] = useState(
    searchParams('id') ? searchParams('id') : ''
  );
  const { fetchData, total, error } = useFetch();
  useEffect(() => {
    fetchData(
      'https://reqres.in/api/products',
      page + 1,
      rowsPerPage,
      filter,
      uploadTable
    );
  }, [page, rowsPerPage, filter, fetchData]);
  function onChangeFilter(e) {
    setFilter(e.target.value);
    naviogate(`../?page=${page}&per_page=${rowsPerPage}&id=${e.target.value}`);
  }
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 480,
          width: '100%',
          padding: 1.5
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            justifySelf: 'flex-start',
            alignSelf: 'flex-start'
          }}
        >
          <TextField
            label="Size"
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            type="number"
            value={filter}
            onChange={(e) => {
              onChangeFilter(e);
            }}
          />

          <IconButton
            onClick={() => {
              setMode(mode === 'dark' ? 'light' : 'dark');
            }}
          >
            {mode === 'ligth' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Box>
        {error !== '' ? (
          <Box
            sx={{
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography>{error}</Typography>
          </Box>
        ) : (
          <>
            <Table aria-label="a dense table" sx={{ maxHeight: '500px' }}>
              <TableHead>
                <TableRow sx={{ height: 10 }}>
                  <TableCell
                    component="th"
                    sx={{ width: 160, fontWeight: 600 }}
                  >
                    Id
                  </TableCell>
                  <TableCell
                    component="th"
                    sx={{ width: 160, fontWeight: 600 }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    component="th"
                    sx={{ width: 160, fontWeight: 600 }}
                  >
                    Year
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ backgroundColor: row.color, height: 10 }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell sx={{ width: 160 }}>{row.name}</TableCell>
                    <TableCell sx={{ width: 160 }}>{row.year}</TableCell>
                  </TableRow>
                ))}

                <TableRow sx={{ width: '100%' }}>
                  <TableCell colSpan={3} />
                </TableRow>
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 }
                    ]}
                    colSpan={3}
                    count={total}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page'
                      },
                      native: true
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )}
      </TableContainer>
    </>
  );
}