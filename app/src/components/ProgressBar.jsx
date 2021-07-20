import React from "react";

function ProgressBar() {
  return (
    <div className="relative pt-1 w-120 mt-5">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
            Nível atual 7
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm font-body inline-block text-white-600">30% completo</span>
        </div>
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
        <div
          style={{ width: "30%" }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
