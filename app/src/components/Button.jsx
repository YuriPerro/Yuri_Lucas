import React from "react";

const btnColors = {
  blue: "bg-blue-500 hover:bg-blue-400",
  red: "bg-red-500 hover:bg-red-400",
  green: "bg-green-500 hover:bg-green-400",
  gray: "bg-gray-300 hover:bg-gray-100 text-gray-800",
  purple: "bg-purple-500 hover:bg-purple-400",
};

const btnWidths = {
  "max-content": "w-max",
  full: "w-full",
};

function Button(props) {
  const {
    type = "button",
    color = "blue",
    width = "max-content",
    className,
    children,
    ...rest
  } = props;

  const colorClass = btnColors[color];
  const widthClass = btnWidths[width];

  return (
    <button
      {...rest}
      type={type}
      className={`tracking-wider shadow-md font-bold text-base rounded-md px-10 py-3 ring-offset-gray-500 transition-all
      focus:outline-none focus:ring-4 ring-blue-400 ring-offset-2 flex items-center justify-center
      gap-2 ${colorClass} ${className} ${widthClass}`}>
      {children}
    </button>
  );
}

export default Button;
