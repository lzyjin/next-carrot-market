"use client";

import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import {handleSubmit} from "@/app/login/actions";
import { useActionState } from "react";

export default function Login() {
  const [state, action] = useActionState(handleSubmit, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">

      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>

      <form action={action} className="flex flex-col gap-3">
        <FormInput type="email" name="email" placeholder="Eamil" required={true} />
        <FormInput type="password" name="password" placeholder="Password" required={true} />
        <FormBtn text="Log in" />
      </form>

      <SocialLogin />

    </div>
  );
}
