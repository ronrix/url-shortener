import React from "react";
import { Link, useRouteError } from "react-router-dom";
import LazyLoad from "react-lazy-load";

export default function () {
  const { status, statusText } = useRouteError();

  return (
    <div className="h-screen flex items-center justify-center w-screen flex-col">
      <LazyLoad height={200} className="bg-grayish">
        <img
          src="../../src/assets/images/error.jpg"
          alt="error vector graphics"
          className="w-52"
        />
      </LazyLoad>
      <div>
        <div className="text-7xl font-bold text-center">Oops!</div>
        <h1 className="my-4 ">Sorry, We can't find the page you requested</h1>
        <h2 className="font-bold text-center">
          {status} {statusText}
        </h2>
        <Link to="/" className="text-center text-blue-500 block mt-3">
          Go back to home
        </Link>
      </div>
    </div>
  );
}
