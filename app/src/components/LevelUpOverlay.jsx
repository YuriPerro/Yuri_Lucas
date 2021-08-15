import React from "react";
import { useStore } from "../store";

import levelUpImg from "../assets/images/level-up.png";
import Button from "./Button";

function LevelUpOverlay() {
  const { didLevelUp, setDidLevelUp, user } = useStore();

  function closeOnClick(e) {
    e.stopPropagation();
    setDidLevelUp(false);
  }

  if (!didLevelUp) return null;
  return (
    <>
      <div
        onClick={closeOnClick}
        className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-40"></div>

      <div className="animate-fade-in p-8 px-16 rounded-lg fixed bg-gray-50 z-50">
        <div className="flex flex-col justify-center items-center relative">
          <img draggable={false} src={levelUpImg} alt="Level Up" className="w-full max-w-sm mb-6" />

          <h1 className="text-blue-500 text-4xl text-center mb-8 leading-snug">
            <b>Parabéns!</b>
            <br /> Você subiu para o nível {user.level}.
          </h1>

          <Button width="full" onClick={() => setDidLevelUp(false)}>
            Confirmar
          </Button>
        </div>
      </div>
    </>
  );
}

export default LevelUpOverlay;
