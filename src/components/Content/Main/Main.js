import React, { useEffect, useState } from "react";
// import Pagination from "../../UI/Pagination/Pagination";
import styles from "./Main.module.css";

// Import Swiper React components
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Headline from "../../UI/Section/Headline";
import MainSection from "../../_hoc/MainSection";
import IndexCarouselCoverFlow from "../../UI/Carousel/IndexCarouselCoverFlow";
import IndexCarouselSlider from "../../UI/Carousel/IndexCarouselSlider";

SwiperCore.use([Virtual, Navigation, Pagination]);

const Main = () => {
  const [weeklyMovies, setWeeklyMovies] = useState([]);
  const [weeklyShows, setWeeklyShows] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const exec = async () => {
      const array = [];
      const array2 = [];
      const popularMoviesArray = [];
      for (let index = 1; index <= 20; index++) {
        const tmpWeeklyMovies = await (
          await fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=d7b36846ca305b29b4f8d87c2585d2a0&page=${index}`
          )
        ).json();
        const tmpWeeklyShows = await (
          await fetch(
            `https://api.themoviedb.org/3/trending/tv/week?api_key=d7b36846ca305b29b4f8d87c2585d2a0&page=${index}`
          )
        ).json();
        const tmpPopular = await (
          await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=d7b36846ca305b29b4f8d87c2585d2a0&page=${index}`
          )
        ).json();

        array.push(...tmpWeeklyMovies.results);
        array2.push(...tmpWeeklyShows.results);
        popularMoviesArray.push(...tmpPopular.results);
      }
      setWeeklyMovies(array);
      setWeeklyShows(array2);
      setPopularMovies(popularMoviesArray);
      setIsLoading(false);
    };
    exec();
  }, []);

  return (
    <>
      <div className="relative">
        <div className={styles["kp-index-wrapper"]}>
          <div className="absolute bottom-16 left-[5vw] right-[5vw] text-center md:left-1/2 md:-translate-x-1/2 h-auto text-white ">
            <h1 className="text-6xl sm:text-6xl md:text-[7vw] ">Movie Pick</h1>
            <p className="text-2xl">Enjoy your favorite movies and shows</p>
          </div>
        </div>
        <div
          className="h-[70vh]"
          style={{
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: "url(assets/images/hero.jpg)",
            zIndex: "-1",
          }}
        ></div>
      </div>
      <MainSection>
        <Headline title="Popular" />
        <div className="flex justify-between">
          <IndexCarouselSlider
            isLoading={isLoading}
            content={popularMovies}
            className="w-full text-center shadow p-1.5 md:p-5 rounded mb-5"
          />
        </div>
      </MainSection>
      <MainSection>
        <Headline title="Trending" />
        <div className="flex flex-wrap justify-between">
          <IndexCarouselCoverFlow
            isLoading={isLoading}
            content={weeklyMovies}
            headline="Movies"
            className="w-full md:w-[49%] text-center shadow p-1.5 md:p-5 rounded mb-5"
          />
          <IndexCarouselCoverFlow
            isLoading={isLoading}
            content={weeklyShows}
            headline="TV Shows"
            className="w-full md:w-[49%] text-center shadow p-1.5 md:p-5 rounded mb-5"
          />
        </div>
        {/* <iframe
          src="https://hdvid.tv/embed-k51h6n4pqpxs.html"
          width="100%"
          height="600"
          allowfullscreen
          allowtransparency
          allow="autoplay"
          scrolling="no"
          frameborder="0"
          title="klevest"
        ></iframe> */}
      </MainSection>
    </>
  );
};

export default Main;
