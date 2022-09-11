import { FC } from 'react';
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHeroArchivePage from "components/SectionHeroArchivePage/SectionHeroArchivePage";

interface ITrainsMainPageProps {
  className?: string;
}

const TrainsMainPage: FC<ITrainsMainPageProps> = ({ className = "" }) => {
  return (
    <div className={`nc-ListingFlightsPage relative overflow-hidden ${className}`}
    data-nc-id="ListingFlightsPage">
      <Helmet>
        <title>Caritempat</title>
      </Helmet>
      <BgGlassmorphism />

      <div className='container relativ'>
        <SectionHeroArchivePage
          currentPage="Kereta"
          currentTab="Kereta"
          listingType={
            <>
              <i className="text-2xl las la-plane-departure"></i>
              <span className="ml-2.5">1599 flights</span>
            </>
          }
          className="pt-10 lg:pt-16"
        />
      </div>
    </div>
  )
};

export default TrainsMainPage;
