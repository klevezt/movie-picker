import React, { useEffect, useState } from "react";
import { truncateString } from "../../Helpers/functions";
// import Pagination from "../../UI/Pagination/Pagination";
import SkeletonWithImage from "../../UI/Skeleton/SkeletonWithImage";
import styles from "./Main.module.css";

// Import Swiper React components
import SwiperCore, {
  Virtual,
  Navigation,
  Pagination,
  Lazy,
  EffectCoverflow,
  Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
// import { } from "swiper";
import Header from "../../Layout/Header/Header";

SwiperCore.use([Virtual, Navigation, Pagination]);

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [movies2, setMovies2] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [swiperRef, setSwiperRef] = useState(null);
  const [swiperRef2, setSwiperRef2] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const exec = async () => {
      const array = [];
      const array2 = [];
      for (let index = 1; index <= 20; index++) {
        const result = await (
          await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=d7b36846ca305b29b4f8d87c2585d2a0&page=${index}`
          )
        ).json();
        const result2 = await (
          await fetch(
            `https://api.themoviedb.org/3/trending/tv/week?api_key=d7b36846ca305b29b4f8d87c2585d2a0&page=${index}`
          )
        ).json();
        array.push(...result.results);
        array2.push(...result2.results);
      }
      setMovies(array);
      setMovies2(array2);
      setIsLoading(false);
    };
    exec();
  }, []);

  const allMovies = movies.map((movie, i) => {
    return (
      <SwiperSlide
        key={movie.title}
        virtualIndex={i}
        className="swiper-no-swiping"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`movie-${movie.title}`}
          className="mb-6 md:mb-0 swiper-lazy"
        />
        <div className={`${styles["row-content"]} row-content hidden`}>
          <h2>{movie.title}</h2>
          <h4>Release date: {movie.release_date}</h4>
          <p>{truncateString(movie.overview, 200)}</p>
        </div>
      </SwiperSlide>
    );
  });

  const allTvMovies = movies2.map((movie, i) => {
    return (
      <SwiperSlide
        key={movie.title}
        virtualIndex={i}
        className="swiper-no-swiping"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`movie-${movie.title}`}
          className="mb-6 md:mb-0 swiper-lazy"
        />
        <div className={`${styles["row-content"]} row-content hidden`}>
          <h2>{movie.title}</h2>
          <h4>Release date: {movie.release_date}</h4>
          <p>{truncateString(movie.overview, 200)}</p>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="container-xl">
      <div className="row mx-0">
        {/* <Header /> */}

        <div className="flex flex-wrap justify-between mt-5 bg-white/[0.3] shadow px-1.5 md:px-5 rounded mb-5">
          {isLoading ? (
            <SkeletonWithImage />
          ) : (
            <>
              <h2 className="text-5xl w-100 text-center my-10">Trending</h2>
              <div className="w-full md:w-[49%] text-center shadow p-1.5 md:p-5 rounded mb-5">
                <h2 className="m-0">Movies</h2>
                <hr className="my-1.5 md:my-6" />
                <Swiper
                  onSwiper={setSwiperRef}
                  effect={"coverflow"}
                  centeredSlides={true}
                  slidesPerView={3}
                  virtual
                  noSwiping
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 2,
                    slideShadows: false,
                    scale: 0.7,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, EffectCoverflow]}
                  className="mySwiper"
                >
                  {allMovies}
                </Swiper>
              </div>
              <div className="w-full md:w-[49%] text-center bg-white/[0.3] shadow p-1.5 md:p-5 rounded mb-5">
                <h2 className="m-0">TV Show</h2>
                <hr className="my-1.5 md:my-6" />
                <Swiper
                  onSwiper={setSwiperRef2}
                  effect={"coverflow"}
                  centeredSlides={true}
                  slidesPerView={3}
                  noSwiping
                  virtual
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 2,
                    slideShadows: false,
                    scale: 0.7,
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay, EffectCoverflow]}
                  className="mySwiper2"
                >
                  {allTvMovies}
                </Swiper>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <Pagination current={page} onClickNext={onClickNext} /> */}
    </div>
  );
};

export default Main;
