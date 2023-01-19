import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Register() {
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

  return (
    <GoogleOAuthProvider clientId="926950853129-r0lvuk9cs0nhdhq13bk4jomkcchelcni.apps.googleusercontent.com">
      <div className="h-screen w-full max-w-500 flex items-center justify-center relative">
        <form
          onSubmit={handleSubmit(async (data: any) => {
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
          })}
          className="flex flex-col text-center m-8 w-300 shadow-lg p-5 rounded border"
        >
          <h4 className="text-2xl font-bold mb-8">Sign In</h4>

          <div className="mx-auto mb-5">
            <GoogleLogin
              onSuccess={async ({ credential }) => {
                const decoded: any = jwtDecode(credential as string);

                await fetch("http://localhost:8000/login", {
                  method: "POST",
                  body: JSON.stringify({
                    email: decoded.email,
                    password: decoded.jti,
                  }),
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                });
              }}
              onError={() => {
                console.log("Login Failed!");
                setErrorMsg({
                  ...errorMsg,
                  error: true,
                });
              }}
            />
          </div>
          <div
            className="relative w-100 bg-grayish mb-5 after:content-['OR'] after:absolute after:left-50 after:bg-white after:text-primary-black after:text-xs"
            style={{ height: "2px" }}
          ></div>
          <input
            {...register("username", { required: true })}
            className="border p-3 m-2 bg-slate-100 focus:bg-white rounded-3xl"
            placeholder="Email address"
            id="username"
          />
          {errors.username && (
            <p className="text-red-600 text-left text-xs m-2 mt-0">
              Username is required.
            </p>
          )}
          <input
            {...register("password", { required: true, minLength: 8 })}
            className="border p-3 m-2 bg-slate-100 focus:bg-white rounded-3xl"
            placeholder="Password"
            type={"password"}
            id="password"
          />
          {errors.password && (
            <p className="text-red-600 text-left text-xs m-2 mt-0">
              Password is required.
            </p>
          )}
          <button
            type="submit"
            className="m-2 bg-sky-500 hover:bg-sky-700 font-bold p-3 rounded-3xl "
          >
            {isLoading ? (
              <img
                src="../../src/assets/loading.gif"
                alt="loading gif"
                className="w-5 mx-auto"
              />
            ) : (
              <span className="text-white">Sign in</span>
            )}
          </button>
          {errorMsg.error && (
            <>
              <p className="text-red-500 text-sm">{errorMsg.msg}</p>
              <p className="text-red-500 text-sm">{errorMsg.note}</p>
            </>
          )}
          <span className="text-sm">
            Forgot password?
            <a href="/forgot-password" className="text-blue-400 ml-2">
              click here
            </a>
          </span>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
}
