import React from "react";

function Input(props) {
  const { className, type = "text", ...rest } = props;
  return (
    <input
      {...rest}
      type={type}
      autoComplete="off"
      className={`mb-2 text-black p-2 px-2 w-full rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-4 ring-blue-400 ${className}`}
    />
  );
}

export default Input;
