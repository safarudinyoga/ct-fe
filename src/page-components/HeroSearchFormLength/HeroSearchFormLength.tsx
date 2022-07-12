import React, { FC, useState } from "react";
import "react-dates/initialize";
import StaySearchForm from "../StaySearchForm/StaySearchForm";

export type SearchTab = "Pesawat";

export interface HeroSearchFormLengthProps {
  className?: string;
  currentPage?: "Pesawat" | "Hotel" | "Villa" | "Mobil" | "Kereta";
}

const HeroSearchFormLength: FC<HeroSearchFormLengthProps> = ({
  className = "",
  currentPage,
}) => {
//   const tabs: SearchTab[] = ["Pesawat"];


  const renderForm = () => {
    switch (currentPage) {
      case "Hotel":
        return <StaySearchForm currentPage={currentPage}/>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-full py-5 lg:py-0 ${className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderForm()}
    </div>
  );
};

export default HeroSearchFormLength;
