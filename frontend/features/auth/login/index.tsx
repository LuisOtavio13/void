import {
  CardAuth,
  CardContent,
  CardHeader,
} from "@/features/auth/components/card-auth";

import {
  AuthSeparator,
  AuthSocialLogin,
  LoginFormAuth,
} from "./components/login-form-auth";

export default function LoginPage() {
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

        <LoginFormAuth />

        <div className="flex justify-end mt-3">
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            esqueceu a senha?
          </button>
        </div>

        <AuthSeparator />

        <AuthSocialLogin />

        <p className="text-zinc-500 text-sm text-center mt-6">
          Não tem uma conta?{" "}
          <a
            href="/registro"
            className="text-blue-400 hover:text-blue-300 font-medium"
          >
            Registre-se
          </a>
        </p>
      </CardContent>
    </CardAuth>
  );
}
