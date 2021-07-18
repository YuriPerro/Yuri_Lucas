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
      const resp = await firebase.auth().signInWithEmailAndPassword(email, password);

      if (resp) {
        const isAdmin = userType === "prof" ? true : false;
        setUser({ email, isAdmin, name: "Usuario atual" });

        if (isAdmin) setLocation("/dashboard");
        else setLocation("/home");
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
            <label htmlFor="email" className="mb-2 font-semibold">
              Email
            </label>
            <Input type="email" id="email" required />

            <label htmlFor="password" className="mb-2 font-semibold">
              Senha
            </label>
            <Input type="password" id="password" minLength={4} required />

            <label htmlFor="type" className="mb-2 font-semibold">
              Tipo de usuário
            </label>
            <Select
              id="userType"
              required
              options={[
                { text: "Aluno", value: "aluno" },
                { text: "Professor", value: "prof" },
              ]}
            />

            <div className="text-right mt-1 mb-6">
              <Link to="/signup"> Cadastrar-se</Link>
            </div>

            <Button color="purple" type="submit" width="full" className="mb-4">
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
