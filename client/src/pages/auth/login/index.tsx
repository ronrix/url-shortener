import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../Input";
import GoogleAuth from "../GoogleAuth";
import SubmitBtn from "../SubmitBtn";

import { loginSchema } from "../schema";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<{
    msg: string;
    error: boolean;
  }>({
    msg: "",
    error: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const navigate = useNavigate();

  async function onSubmit(data: any) {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const responseData: { msg: string; status: number } =
        await response.json();
      if (responseData.status === 200) {
        setIsLoading(false);
        navigate("/dashboard");
      } else {
        console.log(responseData);
        setIsLoading(false);
        reset({ password: "" });
        setErrorMsg({ msg: responseData.msg, error: true });
      }
    } catch (err) {
      setErrorMsg({
        msg: "Oh no! Something went wrong trying to connect with the server. Please try again.",
        error: true,
      });
      setIsLoading(false);
    }
  }

  function handleErrMsg() {
    console.log("Login Failed!");
    setErrorMsg({
      msg: "Something went wrong connecting your google account. Please try again",
      error: true,
    });
  }

  return (
    <GoogleOAuthProvider clientId="926950853129-r0lvuk9cs0nhdhq13bk4jomkcchelcni.apps.googleusercontent.com">
      <div className="h-screen w-full flex items-center justify-center relative">
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col text-center m-8 max-w-320 w-320 shadow-lg p-5 rounded border relative"
        >
          <h4 className="text-2xl font-bold mb-8">Sign In</h4>
          <GoogleAuth handleErrMsg={handleErrMsg} />

          {/* or  */}
          <div
            className="relative w-100 bg-grayish mb-5 after:content-['OR'] after:absolute after:left-50 after:bg-white after:text-primary-black after:text-xs"
            style={{ height: "2px" }}
          ></div>

          {/* error response */}
          {errorMsg.error && (
            <div className="text-xs text-grayish bg-red-400 p-2 rounded-lg w-full">
              <i className="fa-solid fa-circle-exclamation text-grayish text-sm mr-3"></i>
              {errorMsg.msg}
            </div>
          )}

          {/* inputs */}
          <Input
            name="username"
            placeholder="Username"
            register={register}
            error={errors?.username?.message}
          />
          <Input
            name="password"
            placeholder="Password"
            type="password"
            register={register}
            error={errors?.password?.message}
          />
          <a
            href="/forgot-password"
            className="text-blue-400 ml-2 text-xs block self-end"
          >
            Forgot password
          </a>

          <SubmitBtn text="Sign in" isLoading={isLoading} />

          <span className="text-sm mt-5">
            Don't have an account yet?
            <Link to="/register" className="text-blue-400 ml-2 block">
              Sign up here
            </Link>
          </span>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}
