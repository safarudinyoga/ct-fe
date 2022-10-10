import { FC } from 'react';
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";

import './trains.sass'

interface ITrainsMainPageProps {
  className?: string;
}

const TrainsMainPage: FC<ITrainsMainPageProps> = ({ className = "" }) => {

  return (
    <div className={`nc-listingtrainspage relative overflow-hidden ${className}`}
    data-nc-id="listingtrainspage">
      <Helmet>
        <title>Caritempat</title>
      </Helmet>
      <BgGlassmorphism />

      <div className='container relativ'>
        <SectionHeroArchivePage
          currentPage="Kereta"
          currentTab="Kereta"
          className="pt-10 lg:pt-16"
        />
      </div>
    </div>
  )
};

export default TrainsMainPage;
