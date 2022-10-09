import React from "react";

type InputProps = {
  placeholder: string;
  className?: string;
  onChange?: (arg: any) => void;
  value?: string | number;
};

const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      type="text"
      placeholder={rest.placeholder}
      className={`${rest.className}`}
      onChange={rest.onChange}
      value={rest.value}
    />
  );
};

export default Input;
