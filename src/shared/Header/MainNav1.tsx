import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
// import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
// import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import Navbar from "shared/Navigation/Navbar";
import LangDropdown from "components/Header/LangDropdown";
import CurrencyDropdown from "components/Header/CurrencyDropdown";

export interface MainNav1Props {
  isTop: boolean;
}

const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  return (
    <div
      className={`nc-MainNav1 relative z-10 ${isTop ? "onTop " : "notOnTop backdrop-filter"
        }`}
    >
      <div className="container py-3 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navbar />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <div className="px-1" />
            <CurrencyDropdown />
            <LangDropdown />
            <ButtonPrimary href="/login">Sign In</ButtonPrimary>
          </div>
          <div className="flex items-center xl:hidden">
            <div className="px-1" />
            <MenuBar />
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="container py-2">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
