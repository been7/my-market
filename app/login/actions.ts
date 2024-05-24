"use server";

export async function handleForm(prevState: any, formData: FormData) {
  const password = formData.get("password");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (+password! !== 12345) {
    return {
      errors: ["잘못된 비밀번호입니다."],
    };
  }
}
