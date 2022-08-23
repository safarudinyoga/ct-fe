import React, { FC, useState, useRef, useEffect } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import Navbar from "shared/Navigation/Navbar";
import LangDropdown from "components/Header/LangDropdown";
import CurrencyDropdown from "components/Header/CurrencyDropdown";
import { COOKIES, SITE_COOKIES } from "utils/cookies";
import { RootState } from 'state/reducers';
import { Menu, Dropdown } from "antd";
import googlePlay from "images/google-play.png";
import appStore from "images/app-store.png";

import './header.sass'
import { signOut } from "services/firebase";
import { Link } from "react-router-dom";

export interface MainNav1Props {
  isTop: boolean;
  isAuth: boolean
}

const MainNav1: FC<MainNav1Props> = ({ isTop, isAuth }) => {
  // const state = useSelector((state: RootState) => state.authOTP)

  const menu = (
    <Menu items={[
      {
        key: 'summary_profile',
        label: (
          <div className="summary_profile">
            <h5>{COOKIES.get(SITE_COOKIES.FULLNAME)}</h5>
          </div>
        )
      },
      {
        key: 'orders',
        label: (
          <Link to='/dashboard/my-order'>
            Your Orders
          </Link>
        )
      },
      {
        key: 'smart_profile',
        label: 'Smart Profile'
      },
      {
        key: 'smart_pay',
        label: 'Smart Pay'
      },
      {
        key: 'refund',
        label: 'Daftar Refund'
      },
      {
        key: 'reviews',
        label: 'My Reviews'
      },
      {
        key: 'settings',
        label: 'Pengaturan'
      },
      {
        key: 'logout',
        label: <a onClick={signOut}>Keluar</a>
      },
    ]}>
    </Menu>
  )

  const menuUnduhAplikasi = (
    <Menu items={[
      {
        key: 'play_store',
        label: (
          <img src={googlePlay} alt="" className="block max-h-12" />
        )
      },
      {
        key: 'app_store',
        label: (
          <img src={appStore} alt="" className="block max-h-12" />
        )
      },
    ]}>
    </Menu>
  )

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
          <div className="items-center xl:flex space-x-1">
            <div className="px-1" />

            <div className="pr-2 pl-2">
              <Dropdown overlay={menuUnduhAplikasi} trigger={["click"]} placement='bottomRight'>
                <a className="ant-dropdown-link" href="#">
                  Unduh Aplikasi
                </a>
              </Dropdown>
            </div>

            <div className="pr-2 pl-2">
              <a className="ant-dropdown-link" href="#">
                Jadi Partner Caritempat
              </a>
            </div>

            <CurrencyDropdown />
            <LangDropdown />
            {(!isAuth || isAuth === undefined) && <ButtonPrimary className="signin_button" href="/login">Sign In</ButtonPrimary>}
            {isAuth && (
              <Dropdown overlay={menu} trigger={["click"]} placement='bottomRight' overlayClassName="menus">
                <a className="ant-dropdown-link" href="#">
                  <div className="rounded-profile">
                    {COOKIES.get(SITE_COOKIES.NAME)}
                  </div>
                </a>
              </Dropdown>
            )}
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
