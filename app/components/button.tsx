"use client";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <button
        className="h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed bg-slate-100 border-none rounded-full font-bold"
        disabled={pending}
      >
        {pending ? "로딩중" : text}
      </button>
    </>
  );
}
