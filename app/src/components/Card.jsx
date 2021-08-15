import React from "react";

function Card(props) {
  const { title, description, footer, difficulty, hoverEffect, ...rest } = props;

  const getColorByDiff = () => {
    switch (difficulty) {
      case 1:
        return {
          name: "Fácil",
          color: "green-400",
        };
      case 2:
        return {
          name: "Médio",
          color: "yellow-400",
        };
      case 3:
        return {
          name: "Difícil",
          color: "red-400",
        };
      default:
        return {
          name: "Difícil",
          color: "grey-400",
        };
    }
  };

  const hoverClasses = hoverEffect ? "hover:scale-105 cursor-pointer" : "";

  return (
    <div
      {...rest}
      className={`flex flex-col flex-1 border-b-8 border-${
        getColorByDiff()?.color
      } bg-gray-100 shadow-lg rounded-md p-4 w-full text-black transition-all transform ${hoverClasses}`}>
      <div className="flex flex-row ">
        <span className="text-xl mb-4 font-bold text-gray-700">{title}</span>
        <div
          className={`w-16 h-6 rounded-xl p-2 flex absolute right-4 top-4 flex-row items-center justify-center bg-${
            getColorByDiff()?.color
          }`}>
          <span className="text-sm font-semibold text-gray-50">{getColorByDiff()?.name}</span>
        </div>
      </div>
      <p className="text-base mb-4 flex-1">{description}</p>
      <span className="text-base text-gray-500">{footer}</span>
    </div>
  );
}

export default Card;
