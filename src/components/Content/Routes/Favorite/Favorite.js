import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MainSection from "../../../_hoc/MainSection";

const Favorite = () => {
  const favorite = useSelector((state) => state.movies.favoriteMovies);

  const favoriteMovies = favorite?.map((movie) => {
    return (
      <div
        className="flex justify-around shadow my-5 p-10 bg-white rounded"
        key={movie.id}
      >
        <div className="basis-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.id}
          />
        </div>
        <div className="basis-2/4 ">
          <h2 className="text-5xl">{movie.original_title}</h2>
          <p>{movie.overview}</p>
          <NavLink to={`/movie/${movie.id}`} className="btn btn-primary w-max">View Details</NavLink>
        </div>
      </div>
    );
  });

  return <MainSection>{favoriteMovies}</MainSection>;
};

export default Favorite;
