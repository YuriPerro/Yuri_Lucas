import React, { useState } from "react";
import logo from "./assets/logo.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center text-2xl bg-gray-600">
      <header className="text-center text-white">
        <p>Hello Vite + React + Tailwind!</p>
        <p>
          <button
            type="button"
            className={` p-3 my-3 transition-all duration-1000  focus:outline-none ${
              count > 3 ? "bg-red-400" : "bg-blue-400"
            }`}
            onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>

        <img src={logo} alt="logo" className="animate-pulse" />
      </header>
    </div>
  );
}

export default App;
