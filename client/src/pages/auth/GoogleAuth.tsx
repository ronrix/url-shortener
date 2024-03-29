import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

type Props = {
  handleErrMsg: () => void;
  handleClickGoogleAuth: () => void;
};

export default function GoogleAuth({
  handleErrMsg,
  handleClickGoogleAuth,
}: Props) {
  const navigate = useNavigate();
  return (
    <div className='mx-auto mb-5'>
      <GoogleLogin
        click_listener={handleClickGoogleAuth}
        onSuccess={async ({ credential }) => {
          const decoded: any = jwtDecode(credential as string);

          fetch(import.meta.env.VITE_BACKEND_URL + "google-auth", {
            method: "POST",
            body: JSON.stringify({
              id: decoded.sub,
              username: decoded.given_name,
              email: decoded.email,
              picture: decoded.picture,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 200) {
                navigate("/dashboard");
              } else {
                handleErrMsg();
              }
            })
            .catch((err) => {
              console.log(err);
              handleErrMsg();
            });
        }}
        onError={handleErrMsg}
      />
    </div>
  );
}
