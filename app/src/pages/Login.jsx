import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";

import { Link, useLocation } from "wouter";
import { LogoutIcon } from "@heroicons/react/outline";
import { useStore } from "../store";

import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import logo from "../assets/images/logo-quizzer.png";
import { API } from "../api/services";

const PROFESSOR = "professor";
const ALUNO = "aluno";

function Login() {
  const { setUser, setLoading } = useStore();
  const [, setLocation] = useLocation();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const userType = document.getElementById("userType").value;
      const resp = await API.auth.signInWithEmailAndPassword(email, password);

      if (resp) {
        const userDB = await API.getUserById(resp.user.uid);
        const isAdmin = userType === "prof" ? true : false;
        if (isAdmin && userDB.usertype === PROFESSOR) {
          setUser({ isAdmin, ...userDB });
          setLocation("/dashboard");
        } else if (!isAdmin && userDB.usertype === ALUNO) {
          setUser({ isAdmin, ...userDB });
          setLocation("/home");
        } else {
          await API.auth.signOut();
          alert(
            "Ops, não foi possivel fazer o login." +
              " Verifique seu tipo de usuário e tente novamente!",
          );
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col p-8 w-full items-center min-h-screen bg-gradient-to-bl from-purple-600 to-purple-500">
      <div className="w-28">
        <img src={logo} alt="logo" />
      </div>
      <h1 className="text-4xl font-bold mb-14">Entre no Quizzer</h1>

      <main className="flex flex-row justify-center">
        <div className="w-96">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md ml-auto text-base bg-purple-800 shadow-lg max-w5 p-8 rounded-md">
            <label data-test="input-email" htmlFor="email" className="mb-2 font-semibold">
              Email
            </label>
            <Input type="email" id="email" required />

            <label data-test="input-password" htmlFor="password" className="mb-2 font-semibold">
              Senha
            </label>
            <Input type="password" id="password" minLength={4} required />

            <label htmlFor="type" className="mb-2 font-semibold">
              Tipo de usuário
            </label>
            <Select
              id="userType"
              data-test="select-usertype"
              required
              options={[
                { text: "Aluno", value: "aluno" },
                { text: "Professor", value: "prof" },
              ]}
            />

            <div className="text-right mt-1 mb-6">
              <Link to="/signup"> Cadastrar-se</Link>
            </div>

            <Button
              data-test="btn-enter"
              color="purple"
              type="submit"
              width="full"
              className="mb-4">
              Entrar
              <LogoutIcon className="w-6" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
