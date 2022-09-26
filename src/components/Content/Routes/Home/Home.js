import React from "react";
import { useSelector } from "react-redux";

import IndexCarouselSlider from "../../../UI/Carousel/IndexCarouselSlider";
import Headline from "../../../UI/Section/Headline";
import MainSection from "../../../_hoc/MainSection";

const Home = () => {
  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const actionMovies = useSelector((state) => state.movies.actionMovies);
  const horrorMovies = useSelector((state) => state.movies.horrorMovies);


  return (
    <>
      <MainSection>
        <Headline title="Check out our long list" />
        <div className="my-5 bg-white rounded shadow p-6 md:p-10">
          <h2 className="text-4xl my-3">Popular</h2>
          <hr />
          <div className="flex justify-between">
            <IndexCarouselSlider
              isLoading={false}
              content={popularMovies}
              slidesPerView={8}
              spaceBetween={1}
              centeredSlides={false}
              noSwiping={false}
              className="w-full text-center shadow p-1.5 md:p-5 rounded md:mb-5"
            />
          </div>
        </div>
        <div className="my-5 bg-white rounded shadow p-6 md:p-10">
          <h2 className="text-4xl my-3 text-end">Action</h2>
          <hr />
          <div className="flex justify-between">
            <IndexCarouselSlider
              isLoading={false}
              content={actionMovies}
              slidesPerView={8}
              spaceBetween={1}
              centeredSlides={false}
              direction="rtl"
              noSwiping={false}
              className="w-full text-center shadow p-1.5 md:p-5 rounded md:mb-5"
            />
          </div>
        </div>
        <div className="my-5 bg-white rounded shadow p-6 md:p-10">
          <h2 className="text-4xl my-3">Horror</h2>
          <hr />
          <div className="flex justify-between">
            <IndexCarouselSlider
              isLoading={false}
              content={horrorMovies}
              slidesPerView={8}
              spaceBetween={1}
              centeredSlides={false}
              noSwiping={false}
              className="w-full text-center shadow p-1.5 md:p-5 rounded md:mb-5"
            />
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Home;
