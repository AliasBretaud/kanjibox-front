import { useState, useEffect } from "react";
import axios from "axios";

function useGetData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return [data, loading, error] as const;
}

export default useGetData;
