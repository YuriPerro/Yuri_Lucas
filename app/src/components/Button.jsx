import React from "react";

const btnColors = {
  blue: "bg-blue-500 hover:bg-blue-400",
  red: "bg-red-500 hover:bg-red-400",
  green: "bg-green-500 hover:bg-green-400",
  gray: "bg-gray-500 hover:bg-gray-400",
  purple: "bg-purple-500 hover:bg-purple-400",
};

const btnWidths = {
  "max-content": "w-max",
  full: "w-full",
};

function Button(props) {
  const { type = "button", color = "blue", width = "max-content", className, children } = props;

  const colorClass = btnColors[color];
  const widthClass = btnWidths[width];

  return (
    <button
      {...props}
      type={type}
      className={`capitalize shadow-md font-bold text-base rounded-md px-10 py-3 ring-offset-gray-500 transition-all
      focus:outline-none focus:ring-4 ring-blue-400 ring-offset-2 flex items-center justify-center
      gap-2 ${colorClass} ${className} ${widthClass}`}>
      {children}
    </button>
  );
}

export default Button;
