"use server";

import {z} from "zod";

// schema 생성
// 데이터의 조건을 알려줌
const formSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
});

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  // validation
  const result = formSchema.safeParse(data);

  if(!result.success) {
    return result.error.flatten();
  }
}
