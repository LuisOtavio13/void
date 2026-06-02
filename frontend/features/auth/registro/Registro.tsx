import { CardAuth, CardContent, CardHeader } from "../components/card-auth";
import {
  AuthSeparator,
  AuthSocialLogin,
} from "../login/components/login-form-auth";
import { RegistroForm } from "./components/registro-form";

export function Registro() {
  return (
    <CardAuth>
      <CardContent>
        <CardHeader>
          <h1 className="text-3xl font-bold text-white">
            Seja bem vindo de volta
          </h1>

          <p className="text-zinc-400 text-sm leading-relaxed">
            Hoje é um novo dia. É o seu dia.
          </p>
        </CardHeader>

        <RegistroForm />

        <AuthSeparator />

        <AuthSocialLogin />

        <p className="text-zinc-500 text-sm text-center mt-6">
          Já tem uma conta?{" "}
          <a
            href="/registro"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Faça login
          </a>
        </p>
      </CardContent>
    </CardAuth>
  );
}
