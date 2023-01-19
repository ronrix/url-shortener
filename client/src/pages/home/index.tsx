import React from "react";
import Footer from "../../components/ui/footer";

import Header from "../../components/ui/header";
import MainSection from "./main-section";
import Section from "./section-2";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="mt-14 w-100 xl:w-large max-w-large xl:px-20 mx-auto">
        <MainSection />

        <section className="my-32 flex justify-center items-center">
          <img
            src="https://www.pexels.com/assets/api/partner-logos/google-4418a1f96e83446a3b33756437e15b025113d4608057b96779d58c16f7961b66.svg"
            className="w-52"
          ></img>
        </section>

        <Section />
      </div>

      <Footer />
    </div>
  );
}
