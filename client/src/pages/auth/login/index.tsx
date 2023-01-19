import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

import Input from "../Input";
import GoogleAuth from "../GoogleAuth";
import SubmitBtn from "../SubmitBtn";

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<{
    msg: string;
    note: string;
    error: boolean;
  }>({
    msg: "Seems like there's an error trying to login with your google account",
    note: "Please try again or try to login with other accont.",
    error: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data: any) {
    setIsLoading(true);

    await fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((token) => {
        // store token to localStorage
        console.log(token);

        // this adds some time for the loading animation show
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleErrMsg() {
    console.log("Login Failed!");
    setErrorMsg({
      ...errorMsg,
      error: true,
    });
  }

  return (
    <GoogleOAuthProvider clientId="926950853129-r0lvuk9cs0nhdhq13bk4jomkcchelcni.apps.googleusercontent.com">
      <div className="h-screen w-full max-w-500 flex items-center justify-center relative">
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex flex-col text-center m-8 w-300 shadow-lg p-5 rounded border"
        >
          <h4 className="text-2xl font-bold mb-8">Sign In</h4>
          <GoogleAuth handleErrMsg={handleErrMsg} />

          {/* or  */}
          <div
            className="relative w-100 bg-grayish mb-5 after:content-['OR'] after:absolute after:left-50 after:bg-white after:text-primary-black after:text-xs"
            style={{ height: "2px" }}
          ></div>

          {/* inputs */}
          <Input
            name="username"
            required={{ required: true }}
            placeholder="Username"
            errorMsg="Username is require"
            error={errors.username}
            register={register}
          />
          <Input
            name="password"
            required={{ required: true, minLength: 8 }}
            placeholder="Password"
            errorMsg="Password is required"
            error={errors.password}
            type="password"
            register={register}
          />
          <a
            href="/forgot-password"
            className="text-blue-400 ml-2 text-xs block self-end"
          >
            Forgot password
          </a>

          <SubmitBtn text="Sign in" isLoading={isLoading} />

          {errorMsg.error && (
            <>
              <p className="text-red-500 text-sm">{errorMsg.msg}</p>
              <p className="text-red-500 text-sm">{errorMsg.note}</p>
            </>
          )}

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
