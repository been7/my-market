"use server";

import {
  EMAIL_REGEX,
  EMAIL_REGEX_ERROR,
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
  USERNAME_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .includes(EMAIL_REGEX, { message: EMAIL_REGEX_ERROR }),
  username: z
    .string()
    .min(USERNAME_MIN_LENGTH, { message: USERNAME_REGEX_ERROR }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_MIN_ERROR })
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
