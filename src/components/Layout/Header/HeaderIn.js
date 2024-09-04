import { Close, Search } from "@mui/icons-material";
import { AppBar, Container, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../store/slices/userSlice";
import styles from "./Header.module.css";

const Header = () => {
  const [loading, setLoading] = useState(false);

  const [searchResultsTabOpen, setSearchResultsTabOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  // const searchFocus = () => {
  //   setSearchResultsTabOpen(true);
  // };
  // const searchBlur = () => {
  //   setSearchResultsTabOpen(false);
  // };
  const handleClearSearch = () => {
    setSearch("");
  };

  const handleSearchFinished = () => {
    setSearchResultsTabOpen(false);
    handleClearSearch();
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
  }, [search]);

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar className="p-0">
          <div className="w-100 flex flex-wrap justify-between items-center py-3.5 sm:py-0">
            <div>
              <ul className="pl-0 mb-0 flex flex-row items-center">
                <li>
                  <NavLink
                    to={"/home"}
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/favorite"}
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                  >
                    Favorite
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/3 relative order-6 sm:order-2 my-2.5 sm:my-0">
              <input
                type="text"
                className="w-full pl-14 py-1.5 pr-6 rounded text-rose outline-0"
                // onFocus={searchFocus}
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

            <div className="order-3">
              <ul className="pl-0 mb-0 flex flex-row ">
                <li>
                  <NavLink
                    to={"/settings"}
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <button
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {searchResultsTabOpen && searchResults && (
            <div className="absolute top-100  p-2.5 right-0 left-0 bg-white pb-20 border-2 border-rose shadow-lg">
              <h2 className="text-rose text-5xl px-10 py-3.5 border-b-2 border-rose">Results</h2>
              <div
                className={`overflow-y-scroll max-h-[70vh] text-black ${styles["hide-scrolbar"]}`}
              >
                {searchResults.map((result) => {
                  return (
                    <div
                      className="flex flex-wrap justify-around items-center my-1 border-b-2 p-3.5 bg-white rounded"
                      key={result.id}
                    >
                      <div className="md:basis-2/5 mb-3.5 md:mb-0">
                        <img
                          src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                          alt={result.id}
                        />
                      </div>
                      <div className="md:basis-3/5 px-10">
                        <h2 className="text-5xl">{result.original_title}</h2>
                        <p>{result.overview}</p>
                        <NavLink
                          to={`/movie/${result.id}`}
                          className="btn btn-primary w-max"
                          onClick={handleSearchFinished}
                        >
                          View Details
                        </NavLink>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
