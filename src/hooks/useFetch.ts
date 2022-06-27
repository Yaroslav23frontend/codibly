import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";


export function useFetch() {
  const dispatch = useDispatch()
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
    // console.log(`${url}/?page=${page}&per_page=${per_page}&id=${id}`);
    axios
      .get(`${url}/?page=${page}&per_page=${per_page}&id=${id}`)
      .then((result: DATA) => {
        setError("");
        if (id !== "") {
          dispatch({ type: action, payload: [result.data.data] })
          setTotal(1);
        } else {
          dispatch({ type: action, payload: result.data.data })
          setTotal(12);
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
    setError
  };
  return values;
}
