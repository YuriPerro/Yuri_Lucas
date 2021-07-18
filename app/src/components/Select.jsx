import React from "react";

function Select(props) {
  const { options, className, ...rest } = props;

  return (
    <select
      {...rest}
      className={`mb-2 text-black p-2 px-2 w-full rounded-md bg-gray-100 focus:bg-white focus:outline-none focus:ring-4 ring-blue-400 ${className}`}>
      <option value="" disabled>
        Selecione...
      </option>
      {options.map((option) => (
        <option key={option.text + option.value} value={option.value} disabled={option.disabled}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default Select;
