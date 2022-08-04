import Logo from "shared/Logo/Logo";
import SocialsList1 from "shared/SocialsList1/SocialsList1";
import { CustomLink } from "data/types";
import React from "react";
import googlePlay from "images/google-play.png";
import appStore from "images/app-store.png";
import SocialsList from "shared/SocialsList/SocialsList";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Perusahaan",
    menus: [
      { href: "#", label: "Blog" },
      { href: "#", label: "Karir" },
      { href: "#", label: "Corporate" },
      { href: "#", label: "Partner" },
      { href: "#", label: "Perlindungan" },
    ],
  },
  {
    id: "1",
    title: "Produk",
    menus: [
      { href: "#", label: "Hotel" },
      { href: "#", label: "Tiket Pesawat" },
      { href: "#", label: "Tiket Kereta Api" },
      { href: "#", label: "Sewa Mobil" },
      { href: "#", label: "F&B" },
    ],
  },
  {
    id: "2",
    title: "Dukungan",
    menus: [
      { href: "#", label: "Pusat Bantuan" },
      { href: "#", label: "Kebijakan Privasi" },
      { href: "#", label: "Syarat & Ketentuan" },
      { href: "#", label: "Kebijakan Pengembalian" },
      { href: "#", label: "Daftarkan Hotel Anda" },
    ],
  },
  {
    id: "4",
    title: "Download",
    menus: [
      { href: "#", icon: googlePlay, label: "" },
      { href: "#", icon: appStore, label: "" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
              {menu.title == "Download" ? (
                <>
                  <img src={item.icon} alt="" className="block max-h-12" />
                  {item.icon == appStore ? (
                    <div className="flex flex-col mt-5 text-neutral-700 dark:text-neutral-300 text-sm">
                      <div className="flex justify-between items-center mt-4">
                        <SocialsList itemClass="w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 text-xl dark:bg-neutral-800 dark:text-neutral-300" />
                      </div>
                    </div>
                  ) : null}
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-24 lg:py-32 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
        <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <span className="block text-neutral-500 dark:text-neutral-400">
              Dahlia Town House,
              <br />Jl. Lb. Bulus III No.A3
              <br />DKI Jakarta 12440
              <br /><br />
              <a href="http://wa.me/628111612118" target="_blank" className="mt-2">
                +62 811-1612-118
              </a>
              <br />
              <a href="mailto:contact@caritempat.co.id" target="_blank">
                contact@
              </a>
            </span>
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
      <div className="text-center items-center col mt-28">
        <span className="text-center"> &copy; PT Akez Adaphan Hospitaliti. All Rights </span>
      </div>
    </div>
  );
};

export default Footer;
