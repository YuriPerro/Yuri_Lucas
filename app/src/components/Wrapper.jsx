import React from "react";

function Wrapper(props) {
  const { children } = props;
  return <div className="flex text-white justify-center items-center p-5 gap-5">{children}</div>;
}

export default Wrapper;
