import React from "react";
import Navbar from "../components/Navbar";
import Leftsection from "../components/leftsection";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-slate-900 flex flex-row">
        <Leftsection />
      </section>
    </>
  );
};

export default Home;
