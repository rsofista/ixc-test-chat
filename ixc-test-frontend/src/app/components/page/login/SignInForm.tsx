import { api } from "@/app/lib/api";
import { setUser } from "@/app/lib/slices/userSlice";
import { useAppDispatch } from "@/app/lib/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLoginSubmit: React.ComponentProps<"form">["onSubmit"] = (e) => {
    e.preventDefault();

    toast.promise(
      api.auth.login({ email, pass }).then((res) => {
        dispatch(setUser(res.user));

        document.cookie = `token=${res.token}`;
        router.push("/messages");
      }),
      {
        error: (err) => err?.message,
        loading: "Entrando...",
        success: "Logado com sucesso",
      }
    );
  };

  return (
    <form
      className="mx-auto max-w-xl flex flex-col gap-4"
      onSubmit={handleLoginSubmit}
    >
      <h1 className="font-semibold text-4xl">Acesse a sua conta</h1>
      <h3 className="opacity-70 text-md">
        Insira as credenciais para fazer login
      </h3>

      <label htmlFor="email">E-mail</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Senha</label>
      <div className="grid grid-cols-[1fr,auto] items-center pr-1 rounded-md border border-gray-300 focus-within:border-blue-300">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="outline-none border-none"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <span
          className={`cursor-default rounded-full ${
            showPassword ? "bg-red-500" : ""
          }`}
          onClick={() => setShowPassword((p) => !p)}
        >
          👁️
        </span>
      </div>

      <div>
        <input type="checkbox" id="keep-logged-in" />
        <label htmlFor="keep-logged-in" className="ml-2">
          Continar conectado
        </label>
      </div>

      <button className="rounded-3xl border-2 border-black p-2 hover:border-gray-500 hover:text-gray-600">
        Acessar {"->"}
      </button>
    </form>
  );
};
