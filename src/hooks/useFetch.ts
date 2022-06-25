import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ActionTypes } from "@mui/base";

export function useFetch() {
  const dispatch = useDispatch()
  const [data, setData] = useState<Array<object> | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  type DATA = {
    data: {
      data: Array<object>,
      total: number
    }
  }
  function fetchData(
    url: string,
    page: number,
    per_page: number,
    id: number | string,
    action: string
  ) {
    console.log(`${url}/?page=${page}&per_page=${per_page}&id=${id}`);
    axios
      .get(`${url}/?page=${page}&per_page=${per_page}&id=${id}`)
      .then((result: DATA) => {
        console.log(result);
        setError("");
        if (id !== "") {
          dispatch({ type: action, payload: [result.data.data] })
          setTotal(1);
        } else {
          dispatch({ type: action, payload: result.data.data })
          setTotal(result.data.total);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(true));
  }

  const values = {
    loading,
    error,
    fetchData,
    total,
  };
  return values;
}
