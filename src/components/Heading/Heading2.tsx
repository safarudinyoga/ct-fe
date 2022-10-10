import React from "react";
import { ReactNode } from "react";

export interface Heading2Props {
  heading?: ReactNode;
  subHeading?: ReactNode;
  className?: string;
  count?: string | number;
  date?: string;
  guest?: string | number;
}

const Heading2: React.FC<Heading2Props> = ({
  className = "",
  heading = "Stays in Tokyo",
  subHeading,
  count = 1,
  date = 'Aug 12 - 18',
  guest = 2
}) => {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      <h2 className="text-4xl font-semibold">{heading}</h2>
      {subHeading ? (
        subHeading
      ) : (
        <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
          {`${count} Perjalanan`}
          <span className="mx-2">·</span>
          {date}
          <span className="mx-2">·</span>{`${guest} Guests`}
        </span>
      )}
    </div>
  );
};

export default Heading2;
