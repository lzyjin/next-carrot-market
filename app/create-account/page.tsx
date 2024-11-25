"use client";

import FormInput from "@/components/form-input";
import FormBtn from "@/components/form-btn";
import SocialLogin from "@/components/social-login";
import {useActionState} from "react";
import {createAccount} from "@/app/create-account/actions";

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">

      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>

      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput name="username" type="text" placeholder="Username" required={true} errors={state?.fieldErrors.username}  />
        <FormInput name="email" type="email" placeholder="Eamil" required={true} errors={state?.fieldErrors.email}  />
        <FormInput name="password" type="password" placeholder="Password" required={true} errors={state?.fieldErrors.password} />
        <FormInput name="confirm_password" type="password" placeholder="Confirm Password" required={true} errors={state?.fieldErrors.confirm_password} />
        <FormBtn text="Create account" />
      </form>

      <SocialLogin />

    </div>
  );
}