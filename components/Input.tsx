import React from "react";

type InputProps = {
  placeholder: string;
  className?: string;
  onChange?: (arg: any) => void;
};

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      type="text"
      placeholder={rest.placeholder}
      className={`${rest.className}`}
      onChange={rest.onChange}
    />
  );
};

export default Input;
