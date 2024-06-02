import React from "react";
import Navigation from "../common/landingpage/Navigation";
import Hero from "../common/landingpage/Hero";
import About from "../common/landingpage/About";
import "../../sass/custom.scss";
import Superiority from "../common/landingpage/Superiority";

const LandingPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <Hero />
      <Superiority />
      <About />
    </div>
  );
};

export default LandingPage;
