import React from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setFavoriteMovies } from "../../../../store/slices/moviesSlice";
import MainSection from "../../../_hoc/MainSection";
import useFetchSingleMovie from "../../../_hooks/useFetchSingleMovie";

const MovieDetails = () => {
  const fetchRef = useRef(() => {});
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
  }, []);

  const handleAddFavorite = () => {
    dispatch(setFavoriteMovies(movie));
  };

  return (
    <>
      <MainSection className="bg-white">
        <div className="flex">
          <div className="basis-1/3">
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
            <button
              className="btn btn-primary w-max"
              onClick={handleAddFavorite}
            >
              Add to favorite
            </button>
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default MovieDetails;
