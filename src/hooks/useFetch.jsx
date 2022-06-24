import { useState, useEffect } from "react";
import axios from "axios";
export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  function fetchData(url) {
    axios
      .get(url)
      .then((result) => {
        setData(result.data.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    fetchData(url);
  }, []);
  const values = {
    data,
    loading,
    error,
  };
  return values;
}
