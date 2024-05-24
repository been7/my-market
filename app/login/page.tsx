"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import Button from "../components/button";
import Input from "../components/input";
import { handleForm } from "./actions";

export default function Login() {
  const [state, dispatch] = useFormState(handleForm, null);
  const [password, setPassword] = useState(""); // props로 넘겨줌

  return (
    <div className="flex flex-col gap-10 mt-20">
      <div>
        <p className="text-7xl text-center">🔥</p>
      </div>
      <form action={dispatch} className="flex flex-col gap-5">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="username" type="text" placeholder="Username" />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          errors={state?.errors ?? []}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Log in" password={password} />
      </form>
    </div>
  );
}
