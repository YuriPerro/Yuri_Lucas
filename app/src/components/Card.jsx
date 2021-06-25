import React from "react";

function Card(props) {
  const { title, description, footer } = props;

  return (
    <div className="flex flex-col flex-1 bg-gray-100 shadow-lg rounded-md p-4 w-full text-black transition-all transform hover:scale-105 cursor-pointer">
      <span className="text-xl mb-4 font-bold text-gray-700">{title}</span>
      <p className="text-base mb-4 flex-1">{description}</p>
      <span className="text-base text-gray-500">{footer}</span>
    </div>
  );
}

export default Card;
