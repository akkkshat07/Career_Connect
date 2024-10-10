import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItworks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="homePage page">
      <HeroSection />
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default Home;
