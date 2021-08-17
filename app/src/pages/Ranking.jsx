import React, { useEffect, useState } from "react";
import { API } from "../api/services";
import ranking from "../assets/images/ranking.png";
import { ArrowLeftIcon } from "@heroicons/react/outline";

import first from "../assets/images/medal-first.png";
import second from "../assets/images/medal-second.png";
import third from "../assets/images/medal-third.png";
import { useLocation } from "wouter";

import { useStore } from "../store/index";

const Ranking = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  const { user } = useStore();

  const medals = [{ img: first }, { img: second }, { img: third }];

  useEffect(() => {
    (async () => {
      const data = await API.getStudents();
      console.log(Object.values(data));
      setStudents(Object.values(data));
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen w-full p-8 bg-gradient-to-b from-purple-600 to-purple-500">
      <div className="flex items-center">
        <button className="absolute left-8" onClick={() => setLocation("/home")}>
          <ArrowLeftIcon className="w-8 mr-4" />
        </button>
        <h1 className="text-4xl font-bold flex items-center gap-4 mb-1">Ranking geral</h1>
      </div>

      <div className="mt-8 mb-4">
        <img width={100} src={ranking} />
      </div>

      <div className="flex flex-col mt-4">
        {students
          .sort((a, b) => b.xp - a.xp)
          .sort((a, b) => b.level - a.level)
          .map((student, index) => (
            <div
              key={student.uid}
              className={`flex flex-row items-center justify-between h-20 w-160 mb-4 p-4 ${
                user.uid === student.uid ? "border-red-400 border-2" : ""
              } rounded-md bg-purple-700 shadow-md transition-all transform hover:scale-105`}>
              <div className="flex flex-row items-center ">
                {index <= 2 ? <img className="mr-4" width={40} src={medals[index].img} /> : null}
                <span className="font-medium text-lg">{student.name}</span>
              </div>

              <div className="flex flex-row items-center ">
                <span className="mr-4 font-bold text-purple-300">
                  {" "}
                  level {student.level} / {student.xp}xp
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Ranking;
