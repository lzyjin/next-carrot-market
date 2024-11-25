"use server";

import {z} from "zod";

const checkUsername = (username: string) => !username.includes("potato");

const checkPasswords = ({password, confirm_password}: {password: string, confirm_password: string}) => password === confirm_password;

// 영어 소문자, 대문자, 숫자, #?!@$%^&*- 이 특수문자 중 하나의 특수문자를 반드시 포함
const passwordRegex = new RegExp(
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
);

const formSchema = z.object({
  username: z.string({
    invalid_type_error: "Username must be a string!",
    required_error: "Where is my username??"
  }).min(3, "Way too short!!!")
    .max(10, "That is too loooong!")
    .toLowerCase()
    .trim()
    .transform((username) => `🔥${username}🔥`)
    .refine(checkUsername, "No potatoes allowed!"),
  email: z.string()
    .email()
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(10)
    .regex(passwordRegex, "A password must have lowercase, UPPERCASE, a number and special characters."),
  confirm_password: z.string()
    .min(10),
})
  .refine(checkPasswords, {
    message: "Both passwords should be same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);

  if(!result.success) {
    // return result.error.flatten();

    // ta분의 도움 코드
    return {
      fieldErrors: result.error.flatten().fieldErrors,
      formData: data
    };
  } else {
    console.log(result.data); // validated data(transformed data)
  }
}
