import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import Container from "../components/Container";
import useFetch from "../hooks/useFetch";
import TableCustom from "../components/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { useThemeValue } from "../context/ThemeValueContext";
export default function Pages() {
  const { data, error, loading } = useFetch("https://reqres.in/api/products");
  console.log(data);
  const { mode } = useThemeValue();
  return (
    <Container>
      {loading ? <CircularProgress /> : <></>}
      {error !== "" ? (
        <Paper
          sx={{
            width: "300px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            element="p"
            sx={{
              color: mode === "dark" ? "#fff" : "#000",
              textAlign: "center",
            }}
          >
            {error.message}
          </Typography>
        </Paper>
      ) : (
        <TableCustom rows={data} />
      )}
    </Container>
  );
}
