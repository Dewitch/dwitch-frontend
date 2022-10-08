import React from "react";

type InputProps = {
  placeholder: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      type="text"
      placeholder={rest.placeholder}
      className={`${rest.className}`}
    />
  );
};

export default Input;
