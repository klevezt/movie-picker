import { useCallback, useState } from "react";

const API_KEY = "d7b36846ca305b29b4f8d87c2585d2a0";

const useFetch = (url, params = "", pages = 20) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const list = useCallback(async () => {
    console.log("++++");
    const newArr = [];

    for (let index = 1; index <= pages; index++) {
      const res = await fetch(
        `${url}?api_key=${API_KEY}&page=${index}&${params.toString()}`
      );
      const resData = await res.json();
      newArr.push(...resData.results);
    }
    setData(newArr);
    setIsLoading(false);

  }, [url, params, pages]);

  return [data, isLoading, list];
};

export default useFetch;
