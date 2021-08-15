import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { LogoutIcon } from "@heroicons/react/outline";

import Input from "../components/Input";
import Select from "../components/Select";
import Button from "../components/Button";
import logo from "../assets/images/logo-quizzer.png";
import { API } from "../api/services";
import { useStore } from "../store";

import { ErrorCode } from "../constants/codeErrorsFirebase";

function Login() {
  const { setLoading } = useStore();
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({
    name: "",
    registration: "",
    email: "",
    password: "",
    type: "",
  });

  function handleFormChange(event) {
    const { value, name } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    API.auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(async (res) => {
        if (res) {
          const user = {
            email: form.email,
            firstName: form.name,
            lastName: form.name,
            name: form.name,
            registration: form.registration,
            uid: res.user.uid,
            usertype: form.type === "aluno" ? "aluno" : "professor",
          };

          await API.database.ref("users/" + res.user.uid).update(user);

          setLoading(false);
          if (form.type === "aluno") setLocation("/home");
          else setLocation("/dashboard");
          // await res.user.sendEmailVerification();
          // OnAuthStageChanged is the next step
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        setLoading(false);
        var errorCode = error.code;
        var errorMessage = error.message;
        switch (errorCode) {
          case ErrorCode.emailInUse:
            return alert("Já existe uma conta criada com esse e-mail!");
          case ErrorCode.emailInvalid:
            return alert("E-mail informado não e válido");
          case ErrorCode.lowPassword:
            return alert("Senha muita fraca");
          default:
            return alert(errorMessage);
        }
      });
  }

  return (
    <div className="flex flex-col p-8 w-full items-center min-h-screen bg-gradient-to-bl from-purple-600 to-purple-500">
      <div className="w-28">
        <img src={logo} alt="logo" />
      </div>
      <h1 className="text-4xl font-bold mb-14">Cadastre-se no Quizzer</h1>

      <main className="flex flex-row justify-center">
        <div className="w-96">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md ml-auto text-base bg-purple-800 shadow-lg max-w5 p-8 rounded-md">
            <label htmlFor="name" className="mb-2 font-semibold">
              Nome
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              value={form.name}
              onChange={handleFormChange}
            />

            <label htmlFor="registration" className="mb-2 font-semibold">
              Matricula
            </label>
            <Input
              type="text"
              id="registration"
              name="registration"
              required
              value={form.registration}
              onChange={handleFormChange}
            />

            <label htmlFor="email" className="mb-2 font-semibold">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleFormChange}
            />

            <label htmlFor="password" className="mb-2 font-semibold">
              Senha
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              minLength={4}
              required
              value={form.password}
              onChange={handleFormChange}
            />

            <label htmlFor="type" className="mb-2 font-semibold">
              Tipo de usuário
            </label>
            <Select
              id="type"
              name="type"
              required
              options={[
                { text: "Aluno", value: "aluno" },
                { text: "Professor", value: "prof" },
              ]}
              value={form.type}
              onChange={handleFormChange}
            />

            <div className="text-right mt-1 mb-6">
              <Link to="/login"> Ja possui conta</Link>
            </div>

            <Button color="purple" type="submit" width="full">
              Cadastrar
              <LogoutIcon className="w-6" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
