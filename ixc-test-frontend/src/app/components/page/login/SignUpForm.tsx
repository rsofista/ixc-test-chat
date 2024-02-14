import { api } from "@/app/lib/api";
import { setUser } from "@/app/lib/slices/userSlice";
import { useAppDispatch } from "@/app/lib/store";
import router from "next/router";
import { useRef } from "react";
import toast from "react-hot-toast";

export const SignUpForm = () => {
  const dispatch = useAppDispatch();

  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const pass = useRef<HTMLInputElement>(null);

  const signUp = () => {
    if (!email.current || !pass.current) return;

    toast
      .promise(
        api.users.create({
          email: email.current?.value,
          pass: pass.current?.value,
          name: name.current?.value!,
        }),
        {
          error: (err) => err.message,
          loading: "Criando...",
          success: "Criado com sucesso",
        }
      )
      .then((res) => {
        dispatch(setUser(res.user));

        document.cookie = `token=${res.token}`;
        router.push("/messages");
      });
  };

  return (
    <form
      className="mx-auto max-w-xl flex flex-col gap-2"
      onSubmit={(e) => (e.preventDefault(), signUp())}
    >
      <h1 className="font-semibold text-4xl">Crie uma nova conta</h1>

      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" ref={email} required />

      <label htmlFor="name">Nome</label>
      <input type="name" id="name" ref={name} required />

      <label htmlFor="password">Senha</label>
      <input type="password" id="password" ref={pass} required />

      <button className="rounded-3xl border-2 border-black p-2 hover:border-gray-500 hover:text-gray-600">
        Criar
      </button>
    </form>
  );
};
