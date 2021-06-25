import React from "react";

function Quiz(props) {
  const { quizId } = props;
  return (
    <div>
      Quiz
      {quizId}
    </div>
  );
}

export default Quiz;
