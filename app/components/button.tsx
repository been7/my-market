"use client";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  password: string;
}

export default function Button({ text, password }: ButtonProps) {
  const { pending } = useFormStatus();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOnclick = () => {
    // 입력된 비밀번호가 '12345'라면 1초 뒤 'Welcome back!' 띄움
    if (password === "12345") {
      setTimeout(() => {
        setIsSuccess(true);
      }, 1000);
    }
  };

  return (
    <>
      <button
        className="h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed bg-slate-100 border-none rounded-full font-bold"
        disabled={pending}
        onClick={handleOnclick}
      >
        {pending ? "로딩중" : text}
      </button>
      {isSuccess ? ( // 비밀번호가 '12345' 라면
        <div className="h-10 bg-green-500 font-bold rounded-2xl flex items-center p-5">
          <CheckBadgeIcon className="w-5 mr-3 bg-green-500" />
          Welcome back!
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
