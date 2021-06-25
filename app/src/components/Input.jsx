import React from "react";

function Input(props) {
  const { className, type = "text" } = props;
  return (
    <input
      {...props}
      type={type}
      autoComplete="off"
      className={`mb-4 text-black p-2 px-2 w-full  rounded-md focus:outline-none focus:ring-4 ring-blue-400 ${className}`}
    />
  );
}

export default Input;
