import React from "react";

const statusStyles = {
  false: "bg-gray-300 text-gray-500",
  true: "bg-green-400 text-white hover:bg-green-400",
};

const QuizOption = (props) => {
  const { option, status, isSelecting, ...rest } = props;

  const statusClasses = statusStyles[status] || "";
  const isSelectingClasses = isSelecting ? "hover:bg-gray-300 cursor-pointer" : "";

  return (
    <li
      {...rest}
      className={`w-full text-xl text-center p-5 my-4 text-black bg-gray-100 transition-all 
      rounded-2xl select-none ${statusClasses} ${isSelectingClasses}`}>
      {option}
    </li>
  );
};

export default QuizOption;
