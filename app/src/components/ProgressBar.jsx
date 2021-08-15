import React, { useMemo } from "react";
import { useStore } from "../store";
import { getXpToLevelUp } from "../shared";

function ProgressBar() {
  const { user } = useStore();

  const levelPercentageCompleted = useMemo(() => {
    const xpToLevelUp = getXpToLevelUp(user.level);
    return ((user.xp * 100) / xpToLevelUp).toFixed(1);
  }, [user]);

  return (
    <div className="relative pt-1 w-120 mt-5">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span className="text-xs font-bold inline-block py-1 px-2 uppercase rounded-full text-green-700 bg-green-200">
            Nível atual {user.level}
          </span>
        </div>
        <div className="text-right">
          <span className="text-sm font-body inline-block text-white-600">
            {levelPercentageCompleted}% completo
          </span>
        </div>
      </div>
      <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-green-200 border-2 border-green-200">
        <div
          style={{ maxWidth: `${levelPercentageCompleted}%` }}
          className="animate-grown-width shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
