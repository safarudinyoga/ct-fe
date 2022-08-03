import React, { FC, useState, useRef } from "react";
import Logo from "shared/Logo/Logo";
import Navigation from "shared/Navigation/Navigation";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import MenuBar from "shared/MenuBar/MenuBar";
import Navbar from "shared/Navigation/Navbar";
import LangDropdown from "components/Header/LangDropdown";
import CurrencyDropdown from "components/Header/CurrencyDropdown";
import { COOKIES, SITE_COOKIES } from "utils/cookies";
import { RootState } from 'state/reducers';
import { useSelector } from 'react-redux';
import { Menu, Dropdown } from "antd";

import './header.sass'



export interface MainNav1Props {
  isTop: boolean;
}

const MainNav1: FC<MainNav1Props> = ({ isTop }) => {
  const state = useSelector((state: RootState) => state.authOTP)

  // const [modalVisible, setModalVisible] = useState(false)

  const ref = useRef<any>(null)

  const menu = (
    <Menu items={[
      {
        key: 'summary_profile',
        label: (
          <div className="summary_profile">
            <h5>safarudin yoga</h5>
          </div>
        )
      },
      {
        key: 'orders',
        label: 'Your Orders'
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
        label: 'Keluar'
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
            <CurrencyDropdown />
            <LangDropdown />
            {!state.user_logged?.access_token && <ButtonPrimary href="/login">Sign In</ButtonPrimary>}
            {state.user_logged?.initials_name && (
              <div className="header-dropdown">
                <Dropdown overlay={menu} trigger={["click"]} placement='bottomRight'>
                  <a className="ant-dropdown-link" href="#">
                    <div className="rounded-profile">
                      {state.user_logged?.initials_name}
                    </div>
                    <span className="header-dropdown__username">
                      {/* {COOKIES.get(SITE_COOKIES.NAME)} */}
                    </span>
                  </a>
                </Dropdown>
              </div>
            )
            }
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
