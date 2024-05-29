"use server";

import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkPassword = (password: string) => {
  const hasNumber = /\d/;
  hasNumber.test(password);
};

const formSchema = z
  .object({
    email: z
      .string()
      .email()
      .toLowerCase()
      .includes(EMAIL_REGEX, { message: EMAIL_REGEX_ERROR }),
    username: z.string(),
    // .min(USERNAME_MIN_LENGTH, { message: USERNAME_REGEX_ERROR }),
    password: z.string(),
    // .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_MIN_ERROR }),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
      },
    });
    if (username.length < 5) {
      ctx.addIssue({
        code: "custom",
        message: "유저명은 5자 이상이어야 합니다.",
        path: ["username"],
        fatal: true,
      });
    } else if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이름입니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ password }, ctx) => {
    const hasNumber = /\d/;
    const user = await db.user.findMany({
      where: {
        password,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      if (!hasNumber.test(password)) {
        ctx.addIssue({
          code: "custom",
          message: PASSWORD_REGEX_ERROR,
          path: ["password"],
        });
      } else if (password.length < 10) {
        ctx.addIssue({
          code: "custom",
          message: "비밀번호를 10자 이상 입력하세요.",
          path: ["password"],
        });
      }
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();

    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
