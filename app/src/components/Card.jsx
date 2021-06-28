import React from "react";

function Card(props) {
  const { title, description, footer, ...rest } = props;

  return (
    <div
      {...rest}
      className="flex flex-col flex-1 border-b-8 border-green-400 bg-gray-100 shadow-lg rounded-md p-4 w-full text-black transition-all transform hover:scale-105 cursor-pointer">
      <span className="text-xl mb-4 font-bold text-gray-700">{title}</span>
      <p className="text-base mb-4 flex-1">{description}</p>
      <span className="text-base text-gray-500">{footer}</span>
    </div>
  );
}

export default Card;
