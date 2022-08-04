import { StarIcon } from "@heroicons/react/solid";
import React, { FC } from "react";

export interface StartRatingProps {
  className?: string;
  point?: number;
  reviewCount?: number;
}

const StartRating: FC<StartRatingProps> = p => {
  return (
    <div
      className={`nc-StartRating flex items-center space-x-1 text-sm  ${p.className}`}
      data-nc-id="StartRating"
    >
      <StarIcon className="w-5 h-5 text-red-500" />
      <span className="font-medium ">{p.point}</span>
      <span className="text-neutral-500 dark:text-neutral-400">
        {/* ({p.reviewCount}) */}
      </span>
    </div>
  );
};

export default StartRating;
