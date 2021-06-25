import React from "react";
import { useLocation } from "wouter";
import Input from "../components/Input";
import img from "../assets/images/ilustra.png";

function Login() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-bold mb-14">Login</h1>

      <main className="w-full flex gap-8">
        <aside className="flex-1 w-full">
          <article className="text-xl mb-16">
            <p className="mb-4">Bem vindo ao Quizzer.</p>
            <p className="mb-4">
              Sistema gamificado para auxiliar no ensino e aprendizado da disciplina Laboratorio de
              programação Web (DCC121).
            </p>
            <p className="mb-4">
              Aqui você irá encontrar quizzes sobre todo conteúdo da disciplina como HTML, CSS e
              Javascipt. Entre já e comece a aprender.
            </p>
          </article>

          <img src={img} alt="ilustracao" />
        </aside>

        <div className="flex-1 w-full flex flex-col">
          <form
            onSubmit={() => setLocation("/home")}
            className="flex flex-col w-full max-w-md ml-auto text-base bg-gray-500 shadow-md max-w5 p-8 rounded-md">
            <label htmlFor="" className="mb-2 font-semibold">
              Email
            </label>
            <Input type="text" name="email" />

            <label htmlFor="" className="mb-2 font-semibold">
              Senha
            </label>
            <Input type="text" name="password" className="mb-10" />

            <button
              type="submit"
              className="w-full bg-green-400 transition-all hover:bg-green-500 font-bold text-base rounded-md p-2 py-3 ring-offset-gray-500  focus:outline-none focus:ring-4 ring-blue-400 ring-offset-2">
              ENTRAR
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
