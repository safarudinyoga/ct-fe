import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import rightImgDemo from "images/BecomeAnAuthorImg.png";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import Logo from "shared/Logo/Logo";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-50" />
        <h2 className="font-semibold text-3xl sm:text-3xl mt-6 sm:mt-11">
          Tertarik menjadi partner kami?
        </h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          Kamu adalah prioritas kami! Karena itu, caritempat.id bekerjasama dengan berbagai penyedia jasa transportasi, jaringan hotel, sewa mobil, dan penyedia tiket hiburan untuk memastikan liburan kamu selalu nyaman dan menyenangkan.
        </span>
        <ButtonPrimary className="mt-6 sm:mt-11">
          Join Partner
        </ButtonPrimary>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
