import React, { FC, useEffect } from "react";
// import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "page-components/BgGlassmorphism/BgGlassmorphism";
// import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionHeroArchivePage from "page-components/SectionHeroArchivePage/SectionHeroArchivePage";
// import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
// import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionGridHasMap from "page-components/SectionGridHasMap/SectionGridHasMap";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'state';
import { RootState } from 'state/reducers';

export interface ListingStayMapPageProps {
  className?: string;
}

const ListingStayMapPage: FC<ListingStayMapPageProps> = ({
  className = "",
}) => {

  const state = useSelector((state: RootState) => state.hotel)
  const dispatch = useDispatch();
  const { callApiSearch, onChangeInputValue } = bindActionCreators(actionCreators, dispatch)

  return (
    <div
      className={`nc-ListingStayMapPage relative ${className}`}
      data-nc-id="ListingStayMapPage"
    >
      <Helmet>
        <title>Caritempat</title>
      </Helmet>
      <BgGlassmorphism />

      {/* SECTION HERO */}
      {/* <div className="container pt-10 pb-24 lg:pt-16 lg:pb-32">
        <SectionHeroArchivePage currentPage="Hotel" currentTab="Hotel" />
      </div> */}
       <div className="container relative overflow-hidden">
        <SectionHeroArchivePage
          currentPage="Hotel"
          className="pt-10 pb-24 lg:pb-32 lg:pt-16 "
        />
      </div>

      {/* SECTION */}
      <div className="container pb-24 lg:pb-32 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <SectionGridHasMap />
      </div>

      {/* <div className="container overflow-hidden"> */}
        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            heading="Explore by types of stays"
            subHeading="Explore houses based on 10 types of stays"
            categoryCardType="card5"
            itemPerRow={5}
            sliderStyle="style2"
            uniqueClassName="ListingStayMapPage"
          />
        </div> */}

        {/* SECTION */}
        {/* <SectionSubscribe2 className="py-24 lg:py-32" />
      </div> */}
    </div>
  );
};

export default ListingStayMapPage;
