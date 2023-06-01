import { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import { signup } from "@/libs/api-client";
import { useState } from "react";

const Signup: NextPage = () => {
  const { register, handleSubmit, formState } = useForm<SignupForm>();
  const [isSuccess, setIsSuccess] = useState(false);

  const onValid: SubmitHandler<SignupForm> = async (values) => {
    const response = await signup({ payload: values });
    if (response.status === 200) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <h1>Signup</h1>
        <p>I sent a confirmation email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <h1>Signup</h1>
      <div>
        <label>
          Email
          <input
            type="text"
            {...register("email", { required: "email is required" })}
          />
        </label>

        {formState.errors.email && (
          <p style={{ color: "red" }}>{formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <label>
          Password
          <input
            type="password"
            {...register("password", { required: "password is required" })}
          />
        </label>

        {formState.errors.password && (
          <p style={{ color: "red" }}>{formState.errors.password.message}</p>
        )}
      </div>

      <button type={"submit"}>登録</button>
    </form>
  );
};

type SignupForm = {
  email: string;
  password: string;
};

export default Signup;
