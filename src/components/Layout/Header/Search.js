import { Close } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Search = ({
  setSearchResultsTabOpen,
  setSearchResults,
  setSearch,
  search,
}) => {
  const [loading, setLoading] = useState(false);

  const searchFocus = () => {
    setSearchResultsTabOpen(true);
  };
  const searchBlur = () => {
    setSearchResultsTabOpen(false);
  };
  const handleClearSearch = () => {
    setSearch("");
  };

  useEffect(() => {
    if (search !== "") setLoading(true);

    setSearchResultsTabOpen(false);
    const timer = setTimeout(() => {
      if (search !== "") setSearchResultsTabOpen(true);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=d7b36846ca305b29b4f8d87c2585d2a0&query=${search}`
      )
        .then((data) => data.json())
        .then((data) => {
          setSearchResults(data.results);
          setLoading(false);
          console.log(data.results);
          console.log("hahaha");
        });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [search, setSearchResultsTabOpen, setSearchResults]);
  
  return (
    <div className="w-full sm:w-1/3 relative order-6 sm:order-2 my-2.5 sm:my-0">
      <input
        type="text"
        className="w-full pl-14 py-1.5 pr-6 rounded text-rose outline-0"
        onFocus={searchFocus}
        // onBlur={searchBlur}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        className={`absolute flex items-center justify-center px-3 left-0 top-1 bottom-1 w-auto  border-rose text-rose rounded-tl rounded-bl`}
      >
        <Search sx={{ fontSize: "24px" }} />
      </div>
      {loading && (
        <div
          className={`absolute flex items-center justify-center px-3 right-0 top-1 bottom-1 w-auto  border-rose text-rose rounded-tl rounded-bl`}
        >
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && search !== "" && (
        <div
          className={`absolute flex items-center justify-center px-3 right-0 top-1 bottom-1 w-auto  border-rose text-rose rounded-tl rounded-bl`}
          onClick={handleClearSearch}
        >
          <Close sx={{ fontSize: "24px" }} />
        </div>
      )}
    </div>
  );
};

export default Search;
