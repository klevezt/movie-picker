import React, { Fragment, useEffect, useState } from "react";
import { truncateString } from "../../Helpers/functions";
import Pagination from "../../UI/Pagination/Pagination";
import SkeletonWithImage from "../../UI/Skeleton/SkeletonWithImage";
import styles from "./Main.module.css";

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
      }, 2000);
    };
    exec();
  }, [page]);

  const allMovies = movies.map((movie, i) => {
    return isLoading ? (
      <SkeletonWithImage key={i} />
    ) : (
      <div className="col-6" key={i}>
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
      </div>
    );
  });

  const onClickNext = (p) => {
    setPage(p);
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">{allMovies}</div>
      </div>
      <Pagination current={page} onClickNext={onClickNext} />
    </Fragment>
  );
};

export default Main;
