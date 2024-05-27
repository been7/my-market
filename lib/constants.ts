export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_MIN_LENGTH = 10;

export const EMAIL_REGEX = "@zod.com";
export const PASSWORD_REGEX = new RegExp(/^(?=.*\d).{10,}$/);

export const EMAIL_REGEX_ERROR = "@zod.com 이메일만 사용가능합니다.";
export const USERNAME_REGEX_ERROR = "유저명은 5자 이상이어야 합니다.";
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 1개 이상의 숫자를 포함해야 합니다.";

export const PASSWORD_MIN_ERROR = "비밀번호를 10자 이상 입력하세요.";
