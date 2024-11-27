import React from "react";

type props = {
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  type?: string;
  value?: string;
};

export const Input = ({ name, onChange, className, placeholder, type }: props) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      type={type || "text"}
      required
      min={type === "number" ? 1 : undefined}
      className={`${className} bg-gray-200 outline-none p-2 rounded-md`}
      onChange={onChange}
    />
  );
};
