import React, { FC, useState } from "react";
import "react-dates/initialize";
import ExperiencesSearchForm from "./ExperiencesSearchForm";
import StaySearchForm from "./StaySearchForm";
import RentalCarSearchForm from "./RentalCarSearchForm";
import FlightSearchForm from "./FlightSearchForm";
import TrainsSearchForm from "pages/Trains/TrainsSearchForm";

export type SearchTab = "Pesawat" | "Hotel" | "Villa" | "Mobil" | "Kereta";

export interface HeroSearchFormLengthProps {
  className?: string;
  currentTab?: "Pesawat" | "Hotel" | "Villa" | "Mobil" | "Kereta";
  currentPage?: "Pesawat" | "Hotel" | "Villa" | "Mobil" | "Kereta";
}

const HeroSearchFormLength: FC<HeroSearchFormLengthProps> = ({
  className = "",
  currentTab = "",
  currentPage,
}) => {
  const tabs: SearchTab[] = ["Pesawat", "Kereta"];
  const [tabActive, setTabActive] = useState<string>(currentTab);

  const renderTab = () => {
    return (
      <ul className="ml-2 sm:ml-6 md:ml-12 flex space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar">
        {tabs.map((tab, i) => {
          const active = tab === tabActive;

          return (
            <div key={i}></div>
            // <li
            //   onClick={() => setTabActive(tab)}
            //   className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${active
            //     ? ""
            //     : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-400"
            //     } `}
            //   key={tab}
            // >
            //   {active && (
            //     <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 dark:bg-neutral-100 mr-2" />
            //   )}
            // </li>
            // <span>{tab}</span>
          );
        })}
      </ul>
    );
  };

  const renderForm = () => {
    const isArchivePage = !!currentPage && !!currentTab;
    switch (tabActive) {
      case "Pesawat":
        return <FlightSearchForm haveDefaultValue={isArchivePage} placeholder='Flying' description="fly" />;

      case "Kereta":
        return <TrainsSearchForm haveDefaultValue={isArchivePage} placeholder='Trip' description="trip" />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-full py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchFormLength;
