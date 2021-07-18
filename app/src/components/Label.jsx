import React from "react";

function Label(props) {
  const { children, htmlFor, className, ...rest } = props;
  return (
    <label
      htmlFor={htmlFor}
      {...rest}
      className={`whitespace-nowrap mb-2 font-semibold ${className}`}>
      {children}
    </label>
  );
}

export default Label;
