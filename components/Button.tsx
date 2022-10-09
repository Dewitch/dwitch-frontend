import React from "react";

type ButtonProps = {
  label: string;
  onClick?: (arg: any) => void;
  className?: string;
  outline?: boolean;
  primary?: boolean;
  secondary?: boolean;
};

const Button: React.FC<ButtonProps> = ({ ...rest }) => {
  return (
    <button
      type="submit"
      className={`btn ${rest.className} ${rest.outline && `btn-outline`} ${
        rest.primary && `btn-primary`
      } ${rest.secondary && `btn-secondary`}`}
      onClick={rest.onClick}
    >
      {rest.label}
    </button>
  );
};

export default Button;
