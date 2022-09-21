import React from "react";
import { useState } from "react";
import SkeletonWithImage from "../Skeleton/SkeletonWithImage";

// Import Swiper React components
import { EffectCoverflow, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const IndexCarouselCoverFlow = ({
  isLoading,
  content,
  headline,
  className,
}) => {
  const [swiperRef, setSwiperRef] = useState(null);

  const carouselMovies = content.map((movie, i) => {
    return (
      <SwiperSlide
        key={movie.id}
        virtualIndex={i}
        className="swiper-no-swiping"
      >
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={`movie-${movie.title}`}
          className="mb-6 md:mb-0 swiper-lazy"
        />
      </SwiperSlide>
    );
  });

  return (
    <div className={className}>
      {headline && (
        <>
          <h2 className="m-0 text-2xl">{headline}</h2>
          <hr className="my-1.5 md:my-6" />
        </>
      )}
      {isLoading ? (
        <SkeletonWithImage />
      ) : (
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
            modifier: 1,
            slideShadows: false,
            scale: 0.7,
          }}
          autoplay={{
            delay: Math.floor(Math.random() * (5000 - 3000) + 3000),
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectCoverflow]}
          className="mySwiper max-w-[95%]"
        >
          {carouselMovies}
        </Swiper>
      )}
    </div>
  );
};

export default IndexCarouselCoverFlow;
