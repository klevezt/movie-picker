import React, { useEffect } from "react";
// import Pagination from "../../UI/Pagination/Pagination";
import styles from "./Main.module.css";

// Import Swiper React components
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Headline from "../../../UI/Section/Headline";
import MainSection from "../../../_hoc/MainSection";
import IndexCarouselCoverFlow from "../../../UI/Carousel/IndexCarouselCoverFlow";
import IndexCarouselSlider from "../../../UI/Carousel/IndexCarouselSlider";
import useFetch from "../../../_hooks/useFetch";

SwiperCore.use([Virtual, Navigation, Pagination]);

const Main = () => {
  const [weeklyMovies, isLoading, list] = useFetch(
    `https://api.themoviedb.org/3/trending/movie/week`
  );

  const [weeklyShows, isLoading2, list2] = useFetch(
    `https://api.themoviedb.org/3/trending/tv/week`
  );

  const [popularMovies, isLoading3, list3] = useFetch(
    `https://api.themoviedb.org/3/movie/popular`
  );

  useEffect(() => {
    list();
    list2();
    list3();
  }, [list, list2, list3]);

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
            isLoading={isLoading3}
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
            isLoading={isLoading2}
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
