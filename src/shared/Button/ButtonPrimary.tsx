import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonPrimaryProps extends ButtonProps { }

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-50 bg-primary-700 hover:bg-primary-700 text-neutral-50 ${className}`}
      {...args}
      // style={{ padding: '20px !important' }}
    />
  );
};

export default ButtonPrimary;
