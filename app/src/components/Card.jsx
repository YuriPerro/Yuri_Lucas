import React from "react";
import { BadgeCheckIcon } from "@heroicons/react/outline";

function Card(props) {
  const { quiz, isAcomplished, footer, detailsAcomplished, hoverEffect, ...rest } = props;

  const getColorByDiff = () => {
    switch (quiz.difficulty) {
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
      } bg-gray-100 shadow-lg rounded-md  w-full text-black transition-all transform ${
        !isAcomplished && hoverClasses
      }`}>
      <div className="flex flex-col flex-1 p-4 ">
        <div className="flex flex-col">
          <span className="text-xl mb-4 font-bold text-gray-700">{quiz.title}</span>
          <div
            className={`w-16 h-6 rounded-xl p-2 flex absolute right-4 top-4 flex-row items-center justify-center bg-${
              getColorByDiff()?.color
            }`}>
            <span className="text-sm font-semibold text-gray-50">{getColorByDiff()?.name} </span>
          </div>
        </div>
        <p className="text-base mb-4 flex-1">{quiz.description}</p>

        <span className="text-base text-gray-500 mt-auto">{footer}</span>
      </div>

      {isAcomplished && (
        <div className="flex-1 flex flex-row items-end w-full mt-2 mb-2 pl-2 pr-4 justify-between">
          <div className="flex flex-row items-center">
            <BadgeCheckIcon className="w-6 mr-1 text-blue-700" />
            <span className="text-xs font-semibold text-blue-700">Quiz realizado</span>
          </div>
          <span className="font-normal text-sm">Acertos {detailsAcomplished}</span>
        </div>
      )}
    </div>
  );
}

export default Card;
