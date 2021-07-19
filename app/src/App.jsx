import React, { useMemo } from "react";
import { useLocation } from "wouter";
import Routes from "./Routes";

const pagesWithGrayBg = ["/dashboard", "/create-quiz"];

function App() {
  const [location] = useLocation();

  const backgroundClasses = useMemo(() => {
    return pagesWithGrayBg.includes(location)
      ? "from-gray-400 to-gray-400"
      : "from-purple-600 to-purple-500";
  }, [location]);

  return (
    <div
      className={`app min-h-screen flex flex-col items-center bg-gradient-to-b text-base
     text-white ${backgroundClasses}`}>
      <Routes />
    </div>
  );
}

export default App;
