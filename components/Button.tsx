import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  outline?: boolean;
  primary?: boolean;
  secondary?: boolean;
};

const Button: React.FC<ButtonProps> = ({ ...rest }) => {
  return (
    <button
      className={`btn ${rest.className} ${rest.outline && `btn-outline`} ${
        rest.primary && `btn-primary`
      } ${rest.secondary && `btn-secondary`}`}
    >
      {rest.label}
    </button>
  );
};

export default Button;
