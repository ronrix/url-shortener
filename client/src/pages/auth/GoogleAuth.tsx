import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

type Props = {
  handleErrMsg: () => void;
};

export default function GoogleAuth({ handleErrMsg }: Props) {
  return (
    <div className="mx-auto mb-5">
      <GoogleLogin
        onSuccess={async ({ credential }) => {
          const decoded: any = jwtDecode(credential as string);

          await fetch("http://localhost:8000/google-auth", {
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
          });
        }}
        onError={handleErrMsg}
      />
    </div>
  );
}
