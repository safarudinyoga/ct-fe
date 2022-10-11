import { ComponentType } from "react";

export interface LocationStates {
  "/"?: {};
  "/#"?: {};
  "/home-2"?: {};
  "/home-1-header-2"?: {};

  // "/listing-hotels"?: {};
  // "/listing-hotel-map"?: {};
  // "/listing-hotel-detail"?: {};

  //DEV
  //Hotels
  "/hotels"?: {};
  "/hotels/:id"?: {};
  "/hotel-list"?: {};
  "/hotel-reservation/:id/:bookingId"?: {};
  "/hotel-reservation/:id/:bookingId/payment"?: {};
  "/hotel-reservation/:id/:bookingId/payment-result"?: {};

  //Flights
  "/flights"?: {};
  "/flights/list"?: {};
  "/flights/reservation"?: {};

  //
  "/listing-flights"?: {};
  //
  "/listing-stay"?: {};
  "/listing-stay-map"?: {};
  "/listing-stay-detail"?: {};
  //
  "/listing-experiences"?: {};
  "/listing-experiences-map"?: {};
  "/listing-experiences-detail"?: {};
  //
  "/listing-real-estate"?: {};
  "/listing-real-estate-map"?: {};
  "/listing-real-estate-detail"?: {};
  //
  "/listing-car"?: {};
  "/listing-car-map"?: {};
  "/listing-car-detail"?: {};
  //
  "/checkout"?: {};
  "/pay-done"?: {};
  //
  "/account"?: {};
  "/account-savelists"?: {};
  "/account-password"?: {};
  "/account-billing"?: {};
  //
  "/blog"?: {};
  "/blog-single"?: {};
  //
  "/add-listing-1"?: {};
  "/add-listing-2"?: {};
  "/add-listing-3"?: {};
  "/add-listing-4"?: {};
  "/add-listing-5"?: {};
  "/add-listing-6"?: {};
  "/add-listing-7"?: {};
  "/add-listing-8"?: {};
  "/add-listing-9"?: {};
  "/add-listing-10"?: {};
  //
  "/author"?: {};
  "/search"?: {};
  "/about"?: {};
  "/contact"?: {};
  "/login"?: {};
  "/signup"?: {};
  "/forgot-pass"?: {};
  "/page404"?: {};
  "/subscription"?: {};
  "/otp"?: {};
  "/forgot-password"?: {};
  "/reset-password"?: {};

  // dashboard
  "/dashboard/my-order"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  // path: PathName;
  path: any,
  exact?: boolean;
  component: ComponentType<Object>;
}
