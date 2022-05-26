import React, { FC } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
        } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${type === "type1" ? "lg:pl-16" : "lg:pr-16"
          }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          BENnefits
        </span>
        <h2 className="font-semibold text-3xl mt-5">Simplenya di Caritempat.id </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge color="green" name="Simple Booking Process " />
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Pemesanan tanpa ribet di mana pun dan kapan pun.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Simple Reschedule" />
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Memudahkan kamu mengatur ulang penerbangan.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="yellow" name="Simple Refund" />
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Refund tiket tanpa ribet dari aplikasi maupun website.
            </span>
          </li>
          <li className="space-y-4">
            <Badge name="Simple Profile" />
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Pesan lebih cepat, isi data penumpang dengan sekali klik.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
