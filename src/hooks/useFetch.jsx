import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  //   const [perPage, setPerPage] = useState(5);
  //   const [id, setId] = useState("");
  function fetchData(url, page, per_page, id) {
    console.log(`${url}/?page=${page}&per_page=${per_page}&id=${id}`);
    axios
      .get(`${url}/?page=${page}&per_page=${per_page}&id=${id}`)
      .then((result) => {
        console.log(result);
        setError("");
        if (id !== "") {
          setData([result.data.data]);
          setTotal(1);
        } else {
          setData(result.data.data);
          setTotal(result.data.total);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }

  const values = {
    data,
    loading,
    error,
    fetchData,
    total,
  };
  return values;
}
