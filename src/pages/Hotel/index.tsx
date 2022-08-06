import BgGlassmorphism from "page-components/BgGlassmorphism/BgGlassmorphism";
import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { HotelHomeProps } from "./HotelHomeProps";
import bgImage from "images/hero-right2.png";
import SearchBox from "page-components/SearchBox";
import './style.scss';

const p = {
  className: "pt-10 pb-24 lg:pb-32 lg:pt-16",
  currentPage: "Hotel"
}

const HotelHome: FC<HotelHomeProps> = () => {
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>HotelHome</title>
      </Helmet> 
      <BgGlassmorphism />
      <div className="container relative overflow-hidden pt-3 pb-3">
        <div
          className={`nc-SectionHeroArchivePage flex flex-col relative`}
          data-nc-id="SectionHeroArchivePage"
        >
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
              <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
                Hotel
              </h2>
            </div>
            <div className="flex-grow">
              <img className="w-full" src={bgImage} alt="hero" />
            </div>
          </div>
          <div className="flow-root w-full margin-search">
            <div className="z-10 lg:-mt-5 xl:-mt-96 w-full">
              <SearchBox {...p}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelHome;
