import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../../../../store/slices/moviesSlice";
import { MovieThumbsSlider } from "../../../UI/Carousel/MovieThumbsSlider";
import MainSection from "../../../_hoc/MainSection";
import useFetchSingleMovie from "../../../_hooks/useFetchSingleMovie";

const MovieDetails = () => {
  const fetchRef = useRef(() => {});
  const favorite = useSelector((state) => state.movies.favoriteMovies);
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);

  const params = useParams();
  const dispatch = useDispatch();
  const [movie, isLoading, list] = useFetchSingleMovie(
    `https://api.themoviedb.org/3/movie/${params.movieId}`
  );

  fetchRef.current = useCallback(() => {
    list();
  }, [list]);

  useEffect(() => {
    fetchRef.current();
    favorite.find((fav) => {
      if (fav.id.toString() === params.movieId.toString()) {
        setIsMovieFavorite(true);
        return true;
      }
    });
  }, []);

  const handleAddFavorite = () => {
    dispatch(addFavoriteMovie(movie));
    setIsMovieFavorite(true);
  };

  const handleRemoveFavorite = (movie) => {
    favorite.filter((mov) => mov.id.toString() !== movie.id.toString());
    dispatch(removeFavoriteMovie(movie));
    setIsMovieFavorite(false);
  };

  return (
    <>
      <MainSection className="bg-white min-h-[100vh] mb-0">
        <div className="flex">
          <div className="basis-1/3">
            {/* {!isLoading && <MovieThumbsSlider movie={movie} />} */}
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.id}
            />
          </div>
          <div className="flex flex-col basis-2/3 px-20">
            <h2 className="text-5xl">
              {movie.original_title}({movie.release_date?.split("-")[0]})
            </h2>
            <hr />
            <p>{movie.overview}</p>
            {movie?.genres?.map((genre, i) => {
              return <p key={i}>{genre.name},</p>;
            })}
            {!isMovieFavorite ? (
              <button
                className="btn btn-primary w-max"
                onClick={handleAddFavorite}
              >
                Add to favorite
              </button>
            ) : (
              <button
                className="btn btn-danger w-max"
                onClick={() => handleRemoveFavorite(movie)}
              >
                Remove from favorite
              </button>
            )}
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default MovieDetails;
