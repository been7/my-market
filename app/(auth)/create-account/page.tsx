"use client";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Button from "../../components/button";
import Input from "../../components/input";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // 첫 렌더링 시 state?.fieldErrors = undefined 방지하기 위해,
    // state?.fieldErrors가 falsy하고, input password에 값이 있을 때
    if (!state?.fieldErrors && password) {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }, [state?.fieldErrors]);

  return (
    <div className="flex flex-col gap-10 mt-20">
      <div>
        <p className="text-7xl text-center">🔥</p>
      </div>
      <form action={dispatch} noValidate className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="username"
          type="text"
          required
          placeholder="Username"
          minLength={USERNAME_MIN_LENGTH}
          errors={state?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Join" />
        <Link href="/log-in">
          <Button text="Login" />
        </Link>
      </form>
      {isSuccess ? (
        <div className="h-10 bg-green-500 font-bold rounded-2xl flex items-center p-5">
          <CheckBadgeIcon className="w-5 mr-3 bg-green-500" />
          Welcome back!
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
