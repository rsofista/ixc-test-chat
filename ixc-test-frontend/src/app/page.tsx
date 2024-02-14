"use client";

import { useState } from "react";
import { MainContainer } from "./components/MainContainer";
import { SignInForm } from "./components/page/login/SignInForm";
import { SignUpForm } from "./components/page/login/SignUpForm";

export default function Home() {
  const [signIn, setSignIn] = useState(true);

  return (
    <MainContainer size="md">
      <div className="flex flex-col justify-between h-full">
        <div className="flex items-center justify-center align-middle h-full">
          {signIn ? <SignInForm /> : <SignUpForm />}
        </div>
        <button
          className="bg-gray-400 hover:bg-gray-600 hover:text-white py-8 rounded-b-3xl text-bold text-xl"
          onClick={() => setSignIn((p) => !p)}
        >
          {signIn ? "Criar uma nova conta" : "Acessar conta"}
        </button>
      </div>
    </MainContainer>
  );
}
