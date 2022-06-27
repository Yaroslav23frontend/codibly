import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from './TablePaginationAction.tsx';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { useThemeValue } from '../context/ThemeValueContext';
import { Box, Typography } from '@mui/material';
import { useFetch } from '../hooks/useFetch.ts';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { uploadTable } from '../store/action';
import { IRootState } from '../store/store';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { makeStyles } from '@material-ui/styles';
import { url } from '../api/url';
const useStyles = makeStyles({
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
});
export default function TableCustom() {
  const queryString = window.location.search;
  const data = useSelector((state: IRootState) => state.table);
  const { setMode, mode } = useThemeValue();
  function searchParams(param: string) {
    const urlParams = new URLSearchParams(queryString);
    return Number(urlParams.get(param));
  }
  function urlPath() {
    type URL = {
      pathname: string;
    };
    const url: URL = new URL(window.location);
    const pathname = url.pathname.replace(/\//g, '');
    return Number(pathname);
  }
  console.log(urlPath());
  const [page, setPage] = useState<number>(urlPath() !== 0 ? urlPath() : 1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    searchParams('per_page') ? searchParams('per_page') : 5
  );
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    navigate(`../${newPage}/?per_page=${rowsPerPage}&id=${filter}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    navigate(`../${page}/?per_page=${event.target.value}&id=${filter}`);
  };
  const [filter, setFilter] = useState(
    searchParams('id') ? searchParams('id') : ''
  );
  const { fetchData, total, error, setError } = useFetch();
  useEffect(() => {
    if (isNaN(page)) {
      return setError('Not Found');
    } else {
      fetchData(url, page, rowsPerPage, filter, uploadTable);
    }
  }, [page, rowsPerPage, filter]);
  function onChangeFilter(e) {
    setFilter(e.target.value);
    navigate(`../${page}/?per_page=${rowsPerPage}&id=${e.target.value}`);
    if (isNaN(page)) {
      setPage(1);
    }
  }

  const classes = useStyles();
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 480,
          width: '100%',
          padding: 1.5,
          maxHeight: '100vh'
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
            data-testid="filter-input"
            label="Filter by id"
            id="outlined-size-small"
            defaultValue="Small"
            size="small"
            type="number"
            value={filter}
            className={classes.input}
            onChange={(e) => {
              onChangeFilter(e);
            }}
            InputProps={{
              endAdornment:
                filter !== '' ? (
                  <IconButton
                    onClick={() => {
                      setFilter('');
                      navigate(`../${page}/?per_page=${rowsPerPage}&id=`);
                    }}
                    size="small"
                  >
                    <BackspaceIcon fontSize="small" />
                  </IconButton>
                ) : (
                  ''
                )
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
        {error !== '' || data.length === 0 ? (
          <Box
            sx={{
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <Typography>Not found</Typography>
            <Button
              onClick={() => {
                setPage(1);
                setFilter('');
                navigate(`../1/?per_page=${rowsPerPage}&id=`);
              }}
            >
              Home
            </Button>
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
                    data-testid="table-item"
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
            </Table>
            {filter === '' ? (
              <TablePaginationActions
                count={total}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </TableContainer>
    </>
  );
}
