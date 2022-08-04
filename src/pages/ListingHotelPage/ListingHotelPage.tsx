import BgGlassmorphism from "page-components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "page-components/SectionHeroArchivePage/SectionHeroArchivePage";
import React, { FC } from "react";
import { Helmet } from "react-helmet";
export interface ListingStayPageProps {
  className?: string;
}

const ListingStayPage: FC<ListingStayPageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-ListingStayPage relative overflow-hidden ${className}`}
      data-nc-id="ListingStayPage"
    >
      <Helmet>
        <title>Caritempat</title>
      </Helmet> 
      <BgGlassmorphism />

      <div className="container relative overflow-hidden">
        <SectionHeroArchivePage
          currentPage="Hotel"
          className="pt-10 pb-24 lg:pb-32 lg:pt-16 "
        />
      </div>
    </div>
  );
};

export default ListingStayPage;
