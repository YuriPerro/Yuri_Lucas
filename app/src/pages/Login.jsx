import React from "react";
import { useLocation } from "wouter";

import { LoginIcon } from "@heroicons/react/outline";
import Input from "../components/Input";
import Button from "../components/Button";

function Login() {
  const [, setLocation] = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    setLocation("/home");
  }

  return (
    <div className="flex flex-col p-8 w-full items-center min-h-screen bg-gradient-to-b from-gray-600 to-gray-500">
      <h1 className="text-4xl font-bold mb-14">Login</h1>

      <main className="flex flex-row justify-center">
        <div className="">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md ml-auto text-base bg-gray-500 shadow-lg max-w5 p-8 rounded-md">
            <label htmlFor="email" className="mb-2 font-semibold">
              Email
            </label>
            <Input type="email" id="email" name="email" />

            <label htmlFor="password" className="mb-2 font-semibold">
              Senha
            </label>
            <Input type="password" id="password" name="password" className="mb-10" />

            <Button color="green" type="submit" width="full">
              Entrar
              <LoginIcon className="w-6" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
