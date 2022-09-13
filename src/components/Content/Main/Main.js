import React, { Fragment, useEffect, useState } from "react";
import { truncateString } from "../../Helpers/functions";
import Pagination from "../../UI/Pagination/Pagination";
import SkeletonWithImage from "../../UI/Skeleton/SkeletonWithImage";
import styles from "./Main.module.css";
import { FavoriteBorder, Home } from "@mui/icons-material";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const exec = async () => {
      const result = await (
        await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=d7b36846ca305b29b4f8d87c2585d2a0&page=${page}`
        )
      ).json();
      console.log(result.results);
      setMovies(result.results);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };
    exec();
  }, [page]);

  const allMovies = movies.map((movie, i) => {
    return (
      <div className="col-12" key={i}>
        {isLoading ? (
          <SkeletonWithImage key={i} />
        ) : (
          <div className={styles["row-wrapper"]}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={`movie-${movie.title}`}
            />
            <div className={styles["row-content"]}>
              <h2>{movie.title}</h2>
              <h4>Release date: {movie.release_date}</h4>
              <p>{truncateString(movie.overview, 200)}</p>
            </div>
          </div>
        )}
      </div>
    );
  });

  const onClickNext = (p) => {
    setPage(p);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-3 row">
            <nav
              id="sidebarMenu"
              className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
            >
              <div className="pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <div className="nav-link active" aria-current="page">
                      <Home className="me-2" />
                      Home
                    </div>
                  </li>
                  <li className="nav-item">
                    <div className="nav-link">
                      <FavoriteBorder className="me-2" />
                      Favorite
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="col-7 row">{allMovies}</div>
          <div className="col-2">RIGHT</div>
        </div>
        <Pagination current={page} onClickNext={onClickNext} />
      </div>
    </Fragment>
  );
};

export default Main;
