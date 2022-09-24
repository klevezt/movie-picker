import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Favorite = () => {
  const favorite = useSelector((state) => state.movies.favoriteMovies);

  useEffect(()=>{
    console.log(favorite);
  },[])

  const favoriteMovies = favorite?.map((movie, i) => {
    return (
      <div className="flex justify-center items-center" key={movie.id}>
        <div className="basis-1/4">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.id}
          />
        </div>
        <div className="basis-2/4">
          <p>{movie.overview}</p>
        </div>
      </div>
    );
  });

  return <>{favoriteMovies}</>;
};

export default Favorite;
