import { useCallback, useState } from "react";

const API_KEY = "d7b36846ca305b29b4f8d87c2585d2a0";

const useFetchSingleMovie = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const list = useCallback(async () => {

    const res = await fetch(`${url}?api_key=${API_KEY}`);
    const resData = await res.json();

    setData(resData);
    setIsLoading(false);
  }, []);

  return [data, isLoading, list];
};

export default useFetchSingleMovie;
