import React, { useMemo, useState } from "react";
import { ArrowLeftIcon, SearchIcon, UserAddIcon, UserRemoveIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import { useLocation } from "wouter";
import { useStore } from "../store";
import { getXpToLevelUp } from "../shared";

import medal_one from "../assets/images/medal-first.png";
import medal_second from "../assets/images/medal-second.png";
import medal_star from "../assets/images/medal-star.png";

const SearchStudent = () => {
  const [, setLocation] = useLocation();
  const { students = [], setStudents, user } = useStore();
  const [search, setSearch] = useState("");

  function getStudentXpPercentage(student) {
    const xpToLevelUp = getXpToLevelUp(student.level);
    return ((student.xp * 100) / xpToLevelUp).toFixed(1);
  }

  function handleAddFriend(studentId) {
    const studentIndex = students.findIndex((s) => s.uid === studentId);
    const newState = [...students];
    newState[studentIndex] = {
      ...newState[studentIndex],
      isFriend: !!!newState[studentIndex].isFriend,
    };
    setStudents(newState);
  }

  const filteredStudents = useMemo(() => {
    const filterResult = students.filter((student) => !(student.uid === user.uid));

    if (!search) return filterResult;
    return filterResult.filter((student) => {
      const nameNormalized = student.name.trim().toLocaleLowerCase();
      const searchNormalized = search.trim().toLocaleLowerCase();
      return nameNormalized.includes(searchNormalized);
    });
  }, [search, students]);

  return (
    <div className="flex flex-col min-h-screen w-full p-8 bg-gradient-to-b from-purple-600 to-purple-800">
      <header className="flex flex-col gap-2 sm:flex-row justify-center  items-center mb-14">
        <div className="flex items-center">
          <button onClick={() => setLocation("/profile")} className="focus:outline-none">
            <ArrowLeftIcon className="w-8 mr-4" />
          </button>
          <h1 className="text-4xl font-bold flex items-center gap-4 mb-1">Encontrar Amigos</h1>
        </div>

        <div className="flex gap-4 mx-auto"></div>
      </header>

      <main className="flex flex-col grid-cols-1 items-center">
        <div className="w-full mb-14">
          <div className="bg-white flex items-center rounded-full shadow-xl h-14">
            <input
              className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none"
              id="search"
              type="text"
              placeholder="Pesquisar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="p-4">
              <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>

        <ul className="w-full flex justify-start gap-8">
          {filteredStudents.map((student, i) => (
            <li
              key={student.uid}
              className="relative bg-white py-6 px-6 rounded-3xl w-64 my-4 shadow-xl">
              <div className="text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
                <UserIcon className="w-10" />
              </div>

              <button
                onClick={() => handleAddFriend(student.uid)}
                title={student.isFriend ? "Remover amigo" : "Adicionar amigo"}
                className={`text-white flex items-center absolute top-2 right-2 rounded-full p-1 px-3 
                shadow-xl transition-all focus:outline-none ${
                  student.isFriend ? "bg-gray-400" : "bg-blue-500"
                }`}>
                {student.isFriend ? (
                  <>
                    <span className="ml-1">Remover</span>
                    <UserRemoveIcon className="w-6 ml-2" />
                  </>
                ) : (
                  <>
                    <span>Adicionar</span>
                    <UserAddIcon className="w-6 ml-2" />
                  </>
                )}
              </button>

              <div className="mt-8 text-gray-400">
                <p className="text-xl font-bold my-2">{student.name}</p>

                <div className="flex flex-col text-sm">
                  <p className="mb-2">Conquistas</p>
                  <div className="flex">
                    <img src={medal_one} alt="Medalha" className="w-12" />
                    <img src={medal_second} alt="Medalha" className="w-12" />
                    <img src={medal_star} alt="Medalha" className="w-12" />
                  </div>
                </div>

                <hr className="border-t-2 mt-4"></hr>

                <div className="flex justify-between">
                  <div className="flex flex-col my-2">
                    <span className="font-semibold mb-2">Nivel</span>
                    <span className="font-semibold">{student.level}</span>
                  </div>

                  <div className="flex flex-col my-2">
                    <span className="font-semibold mb-2">Experi??ncia</span>
                    <span className="font-semibold">{getStudentXpPercentage(student)}%</span>
                  </div>
                </div>

                <hr className="border-t-2"></hr>

                <div className="flex space-x-2 text-sm mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>Ativo ?? algumas horas atr??s</p>
                </div>
              </div>
            </li>
          ))}
          {!filteredStudents.length && <p className="px-8">Nenhum usu??rio...</p>}
        </ul>
      </main>
    </div>
  );
};

export default SearchStudent;
