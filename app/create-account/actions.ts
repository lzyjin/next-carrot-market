"use server";

import {z} from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";

const checkUsername = (username: string) => !username.includes("potato");

const checkPasswords = ({password, confirm_password}: {password: string, confirm_password: string}) => password === confirm_password;

const formSchema = z.object({
  username: z.string({
    invalid_type_error: "Username must be a string!",
    required_error: "Where is my username??"
  })
    .toLowerCase()
    .trim()
    .transform((username) => `🔥${username}🔥`)
    .refine(checkUsername, "No potatoes allowed!"),
  email: z.string()
    .email()
    .toLowerCase()
    .trim(),
  password: z.string()
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  confirm_password: z.string()
    .min(PASSWORD_MIN_LENGTH),
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
