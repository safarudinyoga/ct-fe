import React, { FC, useEffect, useState } from "react";
import HotelSearchBox from "page-components/HotelSearchBox";
import { SearchBoxProps } from "./SearchBoxProps";

const SearchBox: FC<SearchBoxProps> = p => {
  const renderForm = () => {
    switch (p.currentPage) {
      case "Hotel":
        return <HotelSearchBox {...p}/>; 
      default: 
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-full py-5 lg:py-0 ${p.className}`}
      data-nc-id="HeroSearchForm"
    >
      {renderForm()}
    </div>
  );
};

export default SearchBox;
