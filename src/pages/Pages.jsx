import { Paper } from "@mui/material";
import { useState } from "react";
import Container from "../components/Container";
import useFetch from "../hooks/useFetch";
import TableCustom from "../components/Table";
export default function Pages() {
  const { data, error, loading } = useFetch("https://reqres.in/api/products");
  console.log(data);
  return (
    <Container>
      <TableCustom rows={data} />
    </Container>
  );
}
