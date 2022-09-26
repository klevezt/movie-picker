import { useCallback, useState } from "react";

const API_KEY = "d7b36846ca305b29b4f8d87c2585d2a0";

const useFetchSingleMovie = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const list = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(`${url}?api_key=${API_KEY}`);
    const resData = await res.json();
    console.log(resData);
    setData(resData);
    setIsLoading(false);
  }, [url]);

  return [data, isLoading, list];
};

export default useFetchSingleMovie;
