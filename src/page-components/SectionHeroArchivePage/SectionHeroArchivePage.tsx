import React, { FC, ReactNode } from "react";
import imagePng from "images/hero-right2.png";
import HeroSearchFormLength from "page-components/HeroSearchFormLength/HeroSearchFormLength";
export interface SectionHeroArchivePageProps {
  className?: string;
  currentPage: "Hotel" | "Villa" | "Mobil" | "Pesawat" | "Kereta";
  rightImage?: string;
}

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  currentPage,
  rightImage = imagePng,
}) => {
  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            {currentPage}
          </h2>
        </div>
        <div className="flex-grow">
          <img className="w-full" src={rightImage} alt="hero" />
        </div>
      </div>

      <div className="flow-root w-full">
        <div className="z-10 lg:-mt-5 xl:-mt-96 w-full">
          <HeroSearchFormLength 
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
