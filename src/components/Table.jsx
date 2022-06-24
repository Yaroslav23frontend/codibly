import { useState, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./TablePaginationAction";
import TableHead from "@mui/material/TableHead";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";
import { useThemeValue } from "../context/ThemeValueContext";
import { Box } from "@mui/material";
export default function TableCustom({ rows }) {
  const queryString = window.location.search;
  const { setMode, mode } = useThemeValue();
  function searchParams(param) {
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
  }
  const [page, setPage] = useState(
    searchParams("page") ? searchParams("page") : 0
  );
  const [rowsPerPage, setRowsPerPage] = useState(
    searchParams("per_page") ? searchParams("per_page") : 5
  );
  const naviogate = useNavigate();
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    naviogate(`../?per_page=${rowsPerPage}&page=${newPage}&id=${filter}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    naviogate(`../?per_page=${event.target.value}&page=${page}&id=${filter}`);
    setPage(0);
  };
  const [filter, setFilter] = useState(
    searchParams("id") ? searchParams("id") : ""
  );
  const filteredData = useMemo(() => {
    if (filter === "") {
      return rows;
    }
    const result = rows.filter(
      (el) => `${el.id}`.includes(`${filter}`) !== false
    );
    return result;
  }, [filter, rows]);
  function onChangeFilter(e) {
    setFilter(e.target.value);
    naviogate(`../?per_page=${rowsPerPage}&page=${page}&id=${e.target.value}`);
  }
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 480, width: "100%", padding: 1.5, maxHeight: "500px" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            setMode(mode === "dark" ? "light" : "dark");
          }}
        >
          {mode === "ligth" ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Box>
      <Table aria-label="a dense table" sx={{ maxHeight: "500px" }}>
        <TableHead>
          <TableRow>
            <TableCell component="th" sx={{ width: 160, fontWeight: 600 }}>
              Id
            </TableCell>
            <TableCell component="th" sx={{ width: 160, fontWeight: 600 }}>
              Name
            </TableCell>
            <TableCell component="th" sx={{ width: 160, fontWeight: 600 }}>
              Year
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? filteredData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : filteredData
          ).map((row) => (
            <TableRow key={row.id} sx={{ backgroundColor: row.color }}>
              <TableCell>{row.id}</TableCell>
              <TableCell sx={{ width: 160 }}>{row.name}</TableCell>
              <TableCell sx={{ width: 160 }}>{row.year}</TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow>
              <TableCell colSpan={1} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
