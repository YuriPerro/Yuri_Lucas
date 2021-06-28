import React from "react";

const statusStyles = {
  false: "text-gray-400",
  true: "bg-green-400 text-white hover:bg-green-400",
};

const QuizOption = (props) => {
  const { option, status } = props;

  const statusClass = statusStyles[status] || "";

  return (
    <li
      {...props}
      className={`w-full text-xl text-center p-5 my-4 text-black bg-gray-200 
      transition-all hover:bg-gray-300 focus:outline-none 
      cursor-pointer rounded-2xl select-none ${statusClass}`}>
      {option}
    </li>
  );
};

export default QuizOption;
