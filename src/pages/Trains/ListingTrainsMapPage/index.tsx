import React, { FC } from "react";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridHasMap from "./ListTrains";
import { Helmet } from "react-helmet";

export interface ListingTrainsMapPageProps {
  className?: string;
}

const ListingTrainsMapPage: FC<ListingTrainsMapPageProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`nc-ListingTrainsMapPage relative ${className}`}
      data-nc-id="ListingTrainsMapPage"
    >
      <Helmet>
        <title>Caritempat</title>
      </Helmet>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      <div className="container pt-10 pb-24 lg:pt-16 lg:pb-32">
        <SectionHeroArchivePage currentPage="Kereta" currentTab="Kereta" />
      </div>

      {/* SECTION */}
      <div className="container pb-24 lg:pb-32 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap />
      </div>
    </div>
  );
};

export default ListingTrainsMapPage;
