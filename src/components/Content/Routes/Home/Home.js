import { Search } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import IndexCarouselSlider from "../../../UI/Carousel/IndexCarouselSlider";
import Headline from "../../../UI/Section/Headline";
import MainSection from "../../../_hoc/MainSection";
import useFetch from "../../../_hooks/useFetch";

const Home = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const fetchRef = useRef(() => {});

  const [popularMovies, isLoading, list] = useFetch(
    `https://api.themoviedb.org/3/movie/popular`,
    10
  );

  const [actionMovies, isLoading2, list2] = useFetch(
    `https://api.themoviedb.org/3/discover/movie`,
    new URLSearchParams({
      with_genres: "28",
    }),
    10
  );

  const searchFocus = () => {
    setSearchFocused(true);
  };
  const searchBlur = () => {
    setSearchFocused(false);
  };

  fetchRef.current = useCallback(() => {
    list();
    list2();
  }, [list, list2]);

  useEffect(() => {
    fetchRef.current();
  }, []);

  return (
    <>
      <MainSection>
        <Headline title="Search" />
        <div className="w-100 relative">
          <input
            type="text"
            className="w-full pl-24 py-2.5 pr-6 rounded shadow-lg text-4xl text-center outline-0"
            onFocus={searchFocus}
            onBlur={searchBlur}
            ref={searchRef}
          />
          <div
            className={`absolute flex items-center justify-center px-6 left-0 top-1 bottom-1 w-auto border-r-2 border-rose text-rose ${
              searchFocused ? "bg-rose text-white top-0 bottom-0" : ""
            } rounded-tl rounded-bl`}
          >
            <Search sx={{ fontSize: "36px" }} />
          </div>
        </div>
      </MainSection>
      <MainSection>
        <Headline title="Check out our long list" />
        <div className="my-5 bg-white rounded shadow p-10">
          <h2 className="text-4xl my-3">Popular</h2>
          <hr />
          <div className="flex justify-between">
            <IndexCarouselSlider
              isLoading={isLoading}
              content={popularMovies}
              slidesPerView={8}
              spaceBetween={1}
              centeredSlides={false}
              noSwiping={false}
              className="w-full text-center shadow p-1.5 md:p-5 rounded mb-5"
            />
          </div>
        </div>
        <div className="my-5 bg-white rounded shadow p-10">
          <h2 className="text-4xl my-3 text-end">Action</h2>
          <hr />
          <div className="flex justify-between">
            <IndexCarouselSlider
              isLoading={isLoading2}
              content={actionMovies}
              slidesPerView={8}
              spaceBetween={1}
              centeredSlides={false}
              reverseDirection
              noSwiping={false}
              className="w-full text-center shadow p-1.5 md:p-5 rounded mb-5"
            />
          </div>
        </div>
      </MainSection>
    </>
  );
};

export default Home;
