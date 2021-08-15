import React from "react";
import { useStore } from "../store";

import levelUpImg from "../assets/images/level-up.png";
import Button from "./Button";

function LevelUpOverlay() {
  const { didLevelUp, user } = useStore();

  if (!didLevelUp) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-40"></div>
      <div className="p-8 rounded-md fixed bg-white flex flex-col justify-center items-center z-50">
        <img src={levelUpImg} alt="Level Up" className="w-full max-w-sm" />
        <span className="text-white text-7xl relative -top-56 font-bold">{user.level}</span>

        <h1 className="text-blue-500 text-4xl text-center mb-4">
          <b>Parabéns!</b>
          <br /> Você passou de nível.
        </h1>
        <Button>Confirmar</Button>
      </div>
    </>
  );
}

export default LevelUpOverlay;
