import React from "react";
import { useForm } from "react-hook-form";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  return (
    <GoogleOAuthProvider clientId="1096949201057-qfkcdtmiie2tjnu46bstgca4otu93snk.apps.googleusercontent.com">
      <div className="h-screen w-full max-w-500 flex items-center justify-center relative">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            navigate("/dashboard");
          })}
          className="flex flex-col text-center m-8 w-300 shadow-lg p-5 rounded border"
        >
          <h4 className="text-2xl font-bold mb-8">Sign In</h4>

          <div className="mx-auto mb-5">
            <GoogleLogin
              onSuccess={(credentialRespone) => {
                console.log(credentialRespone);
              }}
              onError={() => {
                console.log("Login Failed!");
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
            id="password"
          />
          {errors.password && (
            <p className="text-red-600 text-left text-xs m-2 mt-0">
              Password is required.
            </p>
          )}
          <input
            type="submit"
            className="m-2 bg-sky-500 hover:bg-sky-700 font-bold p-3 text-white rounded-3xl"
            value="Sign in"
          />
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
