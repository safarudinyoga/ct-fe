import React, { FC } from "react";
import GallerySlider from "components/GallerySlider/GallerySlider";
import { DEMO_STAY_LISTINGS } from "data/listings";
import BtnLikeIcon from "components/BtnLikeIcon/BtnLikeIcon";
import SaleOffBadge from "components/SaleOffBadge/SaleOffBadge";
import Badge from "shared/Badge/Badge";

export interface Stay1 {
  id: number,
  name: string,
  code: string,
  size: string,
  description: string,
  thumbnail: string,
  rooms: [
    {
      name: string,
      code: string,
      provider: string,
      breakfast: boolean,
      refundable: boolean,
      reschedule: boolean,
      price: number,
      ratekey: string,
      search_id: number
    }
  ]
}
export interface StayCardHProps {
  room_groups?: Stay1[]
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCardH: FC<StayCardHProps> = p => {

  const renderSliderGallery = () => {
    let galleryImgs= [
      "https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/1179156/pexels-photo-1179156.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    ]
    return (
      <div className="relative flex-shrink-0 w-full sm:w-72 ">
        <GallerySlider
          ratioClass="aspect-w-6 aspect-h-5"
          galleryImgs={galleryImgs}
          uniqueID={`StayCardH_${p}`}
        />
        <BtnLikeIcon isLiked={true} className="absolute right-3 top-3" />
        <SaleOffBadge className="absolute left-3 top-3" />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="hidden sm:grid grid-cols-3 gap-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-user text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              6 guests
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-bed text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              6 beds
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-bath text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              3 baths
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-smoking-ban text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              No smoking
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-door-open text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              6 bedrooms
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-wifi text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Wifi
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = (a: Stay1) => {
    return (
        <div className="flex-grow p-3 sm:p-5 flex flex-col">
          <div className="space-y-2">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              <span>
              {a.description}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge name="RM_842_2" color="green" />
              <h2 className="text-lg font-medium capitalize">
                <span className="line-clamp-1">{a.name}</span>
              </h2>
            </div>
          </div>
          <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
          <div className="flex justify-between items-end">
            <span className="text-base font-semibold text-secondary-500">
              {a.size}
              {` `}
              {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /night
              </span> */}
            </span>
          </div>
        </div>
        // ))}
      //  </div>
    );
  };

  const renderContent2 = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
            Hotel Sahid Bandar Lampung terletak di Teluk Betung, wilayah yang populer dengan pantainya yang eksotis. Hotel bintang 3 ini mempunyai 70 kamar yang didesain sesuai dengan selera anda, berbagai jenis kamar dari Superior ke Suite dan dilengkapi dengan Kola
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge name="RM_842_3" color="green" />
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">4 Bedroom</span>
            </h2>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {renderTienIch()}
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
          {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
          <span className="text-base font-semibold text-secondary-500">
            4
            {` `}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      { p.room_groups && p.room_groups.map((a, index) => (
      <div
        // className={`nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
        className={`mb-4 nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform`}
        data-nc-id="StayCardH"
      >
            <button className="flex flex-col sm:flex-row sm:items-center">
              {renderSliderGallery()}
              {renderContent(a)}
            </button>
      </div>
      ))}
    </div>
  );
};

export default StayCardH;
