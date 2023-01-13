import React from "react";
import SolidButton from "../../../components/ui/btns/SolidButton";

export default function Left() {
  return (
    <section className="p-5 text-center md:text-left mb-10 desktop:0">
      <h1 className="text-5xl font-bold">Start generating your short URL's.</h1>
      <h2 className="leading-relaxed text-gray tracking-wide my-5 md:pr-16">
        Give yourself a better organization and easy access of your favorite
        sites by making it short. It's free and easy to do. Get started and
        immediately generate your favorite sites.
      </h2>
      <SolidButton text="Get Started" style="mt-8" />
    </section>
  );
}
