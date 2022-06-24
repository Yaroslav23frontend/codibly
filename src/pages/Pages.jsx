import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import Container from "../components/Container";
import useFetch from "../hooks/useFetch";
import TableCustom from "../components/Table";
import CircularProgress from "@mui/material/CircularProgress";
import { useThemeValue } from "../context/ThemeValueContext";
export default function Pages() {
  return (
    <Container>
      <TableCustom />
    </Container>
  );
}
