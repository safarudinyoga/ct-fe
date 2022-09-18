import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Router } from "react-router";
import { Page } from './types';
import { history } from "index";
import { COOKIES, SITE_COOKIES } from "utils/cookies";
import PrivateRouter from "./privateRouter";

import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import ListingStayPage from "containers/ListingStayPage/ListingStayPage";
import ListingStayMapPage from "containers/ListingStayPage/ListingStayMapPage";
import ListingExperiencesPage from "containers/ListingExperiencesPage/ListingExperiencesPage";
import ListingExperiencesMapPage from "containers/ListingExperiencesPage/ListingExperiencesMapPage";
import ListingStayDetailPage from "containers/ListingDetailPage/ListingStayDetailPage";
import ListingExperiencesDetailPage from "containers/ListingDetailPage/ListingExperiencesDetailPage";
import ListingCarPage from "containers/ListingCarPage/ListingCarPage";
import ListingCarMapPage from "containers/ListingCarPage/ListingCarMapPage";
import ListingCarDetailPage from "containers/ListingDetailPage/ListingCarDetailPage";
import CheckOutPage from "containers/CheckOutPage/CheckOutPage";
import PayPage from "containers/PayPage/PayPage";
import AuthorPage from "containers/AuthorPage/AuthorPage";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountSavelists from "containers/AccountPage/AccountSavelists";
import AccountBilling from "containers/AccountPage/AccountBilling";
import PageContact from "containers/PageContact/PageContact";
import PageAbout from "containers/PageAbout/PageAbout";
// import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import BlogPage from "containers/BlogPage/BlogPage";
import BlogSingle from "containers/BlogPage/BlogSingle";
import PageAddListing1 from "containers/PageAddListing1/PageAddListing1";
import PageAddListing2 from "containers/PageAddListing1/PageAddListing2";
import PageAddListing3 from "containers/PageAddListing1/PageAddListing3";
import PageAddListing4 from "containers/PageAddListing1/PageAddListing4";
import PageAddListing5 from "containers/PageAddListing1/PageAddListing5";
import PageAddListing6 from "containers/PageAddListing1/PageAddListing6";
import PageAddListing7 from "containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "containers/PageAddListing1/PageAddListing8";
import PageAddListing9 from "containers/PageAddListing1/PageAddListing9";
import PageAddListing10 from "containers/PageAddListing1/PageAddListing10";
import PageHome2 from "containers/PageHome/PageHome2";
import ListingRealEstateMapPage from "containers/ListingRealEstatePage/ListingRealEstateMapPage";
import ListingRealEstatePage from "containers/ListingRealEstatePage/ListingRealEstatePage";
import SiteHeader from "containers/SiteHeader";
import ListingFlightsPage from "containers/ListingFlightsPage/ListingFlightsPage";

//dev
import PageHome from "pages/HomePage/HomePage";
// import ListingHotel from "pages/ListingHotelPage/ListingHotelPage";
// import ListingHotelMap from "pages/ListingHotelPage/ListingHotelMapPage";
// import ListingHotelDetail from "pages/ListingHotelPage/ListingHotelDetailPage";
import HotelHome from "pages/Hotel";
import HotelDetail from "pages/Hotel/HotelDetail";
import HotelList from "pages/Hotel/HotelList";
import HotelReservation from "pages/Hotel/HotelReservation";
import HotelPayment from "pages/Hotel/HotelPayment";
import HotelPaymentResult from "pages/Hotel/HotelPaymentResult";
import Register from "pages/Register";
import OTP from "pages/OTP";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";

// trains
import TrainsMainPage from "pages/Trains";

// dashboard
import MyOrder from "pages/DashboardUser/MyOrder";
import Account from "pages/DashboardUser/Account";
import ListingTrainsMapPage from "pages/Trains/ListingTrainsMapPage";

export const pages: Page[] = [
  //dev
  // { path: "/", exact: true, component: PageHome },
  { path: "/hotels", exact: true, component: HotelHome },
  { path: "/hotels/:id", component: HotelDetail },
  { path: "/hotel-list", component: HotelList },
  { path: "/hotel-reservation/:id/:bookingId", exact: true, component: HotelReservation},
  { path: "/hotel-reservation/:id/:bookingId/payment", component: HotelPayment},
  { path: "/hotel-reservation/:id/:bookingId/payment-result", component: HotelPaymentResult},
  // { path: "/listing-hotels", component: ListingHotel },
  // { path: "/listing-hotel-map", component: ListingHotelMap },
  // { path: "/listing-hotel-detail", component: ListingHotelDetail },
  //


  { path: "/#", exact: true, component: PageHome },
  { path: "/home-2", component: PageHome2 },
  //
  { path: "/listing-stay", component: ListingStayPage },
  { path: "/listing-stay-map", component: ListingStayMapPage },
  { path: "/listing-stay-detail", component: ListingStayDetailPage },
  //
  {
    path: "/listing-experiences",
    component: ListingExperiencesPage,
  },
  {
    path: "/listing-experiences-map",
    component: ListingExperiencesMapPage,
  },
  {
    path: "/listing-experiences-detail",
    component: ListingExperiencesDetailPage,
  },
  //
  { path: "/listing-car", component: ListingCarPage },
  { path: "/listing-car-map", component: ListingCarMapPage },
  { path: "/listing-car-detail", component: ListingCarDetailPage },
  //
  { path: "/listing-real-estate-map", component: ListingRealEstateMapPage },
  { path: "/listing-real-estate", component: ListingRealEstatePage },
  //
  { path: "/listing-flights", component: ListingFlightsPage },
  //
  { path: "/checkout", component: CheckOutPage },
  { path: "/pay-done", component: PayPage },
  //
  { path: "/author", component: AuthorPage },
  { path: "/account", component: AccountPage },
  { path: "/account-password", component: AccountPass },
  { path: "/account-savelists", component: AccountSavelists },
  { path: "/account-billing", component: AccountBilling },
  //
  { path: "/blog", component: BlogPage },
  { path: "/blog-single", component: BlogSingle },
  //
  { path: "/add-listing-1", component: PageAddListing1 },
  { path: "/add-listing-2", component: PageAddListing2 },
  { path: "/add-listing-3", component: PageAddListing3 },
  { path: "/add-listing-4", component: PageAddListing4 },
  { path: "/add-listing-5", component: PageAddListing5 },
  { path: "/add-listing-6", component: PageAddListing6 },
  { path: "/add-listing-7", component: PageAddListing7 },
  { path: "/add-listing-8", component: PageAddListing8 },
  { path: "/add-listing-9", component: PageAddListing9 },
  { path: "/add-listing-10", component: PageAddListing10 },
  //
  { path: "/contact", component: PageContact },
  { path: "/about", component: PageAbout },

  // trains
  { path: "/trains", component: TrainsMainPage },
  { path: "/listing-trains", component: ListingTrainsMapPage }
  // { path: "/subscription", component: PageSubcription },
  //
];

// here the components already added main
const pagesNoLayout: Page[] = [
  { path: "/", exact: true, component: PageHome },
  { path: "/signup", exact: true, component: Register },
  { path: "/login", exact: true, component: PageLogin },
  { path: "/otp", exact: true, component: OTP },
  { path: '/forgot-password', exact: true, component: ForgotPassword },
  { path: '/reset-password', exact: true, component: ResetPassword },

  // dashboard private
  // { path: '/dashboard/my-order', exact: true, component: MyOrder },
  // { path: '/dashboard/my-account', exact: true, component: Account }
]

const noLayout = () => (
  <>
    <ScrollToTop />
    <SiteHeader />
    {pages.map(({ component, path, exact }) => {
      return (
        <Route
          key={path}
          component={component}
          exact={!!exact}
          path={path}
        />
      );
    })}
    <Footer />
  </>
)

// Private Route that needed logged user
const privateRouteList: Page[] = [
  // { path: '', exact: true, component: null }
  { path: '/dashboard/my-order', exact: true, component: MyOrder },
  { path: '/dashboard/my-account', exact: true, component: Account }
]

const Routes = () => {
  return (
    <Router history={history}>

      {/* <ScrollToTop />
      <SiteHeader /> */}

      <Switch>
        {pagesNoLayout.map(({ component, path, exact }) => {
          return (
            <Route
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        {privateRouteList.map(({ component, path, exact }) => {
          return (
            <PrivateRouter
              key={path}
              component={component}
              exact={!!exact}
              path={path}
            />
          );
        })}
        {noLayout()}
        <Route component={Page404} />
      </Switch>
    </Router>
  );
};

export default Routes;
