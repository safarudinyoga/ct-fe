import { MegamenuItem, NavItemType } from "shared/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Company",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "App Name",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "City",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Contruction",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Country",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Country,
    })),
  },
];

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Hotel",
  },
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Rental Mobil",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/home-1-header-2",
    name: "Tiket Pesawat",
    isNew: true,
  },
];

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Blog Page",
  },
  {
    id: ncNanoId(),
    href: "/blog-single",
    name: "Blog Single",
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "About",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Contact us",
  },
  {
    id: ncNanoId(),
    href: "/login",
    name: "Login",
  },
  {
    id: ncNanoId(),
    href: "/signup",
    name: "Signup",
  },
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Subscription",
  },
];

const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/add-listing-1",
    name: "Add Listings",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/add-listing-1",
        name: "Add Listings 1",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-2",
        name: "Add Listings 2",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-3",
        name: "Add Listings 3",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-4",
        name: "Add Listings 4",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-5",
        name: "Add Listings 5",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-6",
        name: "Add Listings 6",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-7",
        name: "Add Listings 7",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-8",
        name: "Add Listings 8",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-9",
        name: "Add Listings 9",
      },
      {
        id: ncNanoId(),
        href: "/add-listing-10",
        name: "Add Listings 10",
      },
    ],
  },
  //
  { id: ncNanoId(), href: "/checkout", name: "Checkout" },
  { id: ncNanoId(), href: "/pay-done", name: "Pay done" },
  //
  { id: ncNanoId(), href: "/author", name: "Author Page" },
  { id: ncNanoId(), href: "/account", name: "Account Page" },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/flights",
    name: "Pesawat",
    isNew: true,
  },
  {
    id: ncNanoId(),
    // href: "/listing-hotels",
    href: "/hotels",
    name: "Hotel",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/trains",
    name: "Kereta",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-real-estate",
    name: "Villa & Apartment",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-car",
    name: "Rental Mobil",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/listing-experiences",
    name: "Food & Beverage",
  },

  {
    id: ncNanoId(),
    href: "/event",
    name: "Event",
  },
];

export const NAVIGATION_TOP: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/https://play.google.com/store/apps/details?id=com.digitcode.ct",
    name: "Unduh Aplikasi",
    isNew: true,
    targetBlank: true,
    type: "icon",
    icon: "las la-mobile text-primary"
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Daftar Jadi Partner",
    type: "icon",
    icon: "las la-handshake"
  },
  {
    id: ncNanoId(),
    href: "#",
    name: "Pesanan Saya",
    type: "icon",
    icon: "las la-shopping-cart"
  },
];
