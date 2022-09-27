import { Chip } from "@mui/material";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../../../../store/slices/moviesSlice";
import { MovieThumbsSlider } from "../../../UI/Carousel/MovieThumbsSlider";
import Headline from "../../../UI/Section/Headline";
import MainSection from "../../../_hoc/MainSection";
import useFetchSingleMovie from "../../../_hooks/useFetchSingleMovie";
import parse from "html-react-parser";

const db = require("../../../../movieVideoLinks.json");

const MovieDetails = () => {
  const fetchRef = useRef(() => {});
  const favorite = useSelector((state) => state.movies.favoriteMovies);
  const [isMovieFavorite, setIsMovieFavorite] = useState(null);
  const [movieVideo, setMovieVideo] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const [movie, isLoading, list] = useFetchSingleMovie(
    `https://api.themoviedb.org/3/movie/${params.movieId}`
  );
  const [fetchMovieTrailer, isLoading2, list2] = useFetchSingleMovie(
    `https://api.themoviedb.org/3/movie/${params.movieId}/videos`
  );

  const trailerKey = fetchMovieTrailer?.results?.filter(
    (movie) => movie.site === "YouTube" && movie.type === "Trailer"
  )[0]?.key;

  fetchRef.current = useCallback(() => {
    list();
    list2();
  }, [list, list2]);

  useEffect(() => {
    fetchRef.current();

    db.find((db) => {
      if (db.id.toString() === params.movieId.toString()) {
        setMovieVideo(db.iframe);
        return true;
      }
      setMovieVideo("");
      return false;
    });
    favorite.find((fav) => {
      if (fav.id.toString() === params.movieId.toString()) {
        setIsMovieFavorite(true);
        return true;
      }
      return false;
    });
  }, [params, movieVideo]);

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
        <div className="flex flex-wrap">
          <div className="md:basis-2/5 mb-8">
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.id}
            />
          </div>
          <div className="flex flex-col md:basis-3/5 md:px-20">
            <h2 className="text-5xl">
              {movie.original_title}({movie.release_date?.split("-")[0]})
            </h2>
            <hr />
            <p>{movie.overview}</p>
            <div className="inline-flex mb-3">
              {movie?.genres?.map((genre, i) => {
                return (
                  <Chip
                    color="info"
                    size="small"
                    label={genre.name}
                    key={i}
                    className="w-max mx-1"
                  />
                );
              })}
            </div>
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
        <hr className="my-20" />
        <Headline title="Movie Insights" />
        <div className="row">
          <div className="col-12 col-md-6 mb-5 ">
            <h2 className="mb-6 md:mb-2"> Photo Gallery</h2>
            {!isLoading && <MovieThumbsSlider movie={movie} />}
          </div>
          {trailerKey && (
            <div className="col-12 col-md-6 md:text-end mb-5">
              <h2 className="mb-6 md:mb-2">Trailer</h2>
              {!isLoading2 && (
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  allowFullScreen={false}
                  width="100%"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  height="380px"
                  frameBorder="0"
                  title={trailerKey}
                ></iframe>
              )}
            </div>
          )}
        </div>
        {movieVideo && (
          <div className="row px-0">
            <div className="col-12">
              <h2 className=" mb-6 md:mb-2">Movie</h2>
              {parse(movieVideo)}
            </div>
          </div>
        )}
      </MainSection>
    </>
  );
};

export default MovieDetails;
