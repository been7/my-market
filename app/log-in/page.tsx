"use client";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";
import Button from "../components/button";
import Input from "../components/input";
import { login } from "./actions";

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 mt-20">
      <div>
        <p className="text-7xl text-center">🤗</p>
      </div>
      <form action={dispatch} className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Login" />
      </form>
    </div>
  );
}
