import React, { useEffect } from "react";
import LandingPage from "../components/specific/LandingPage";
import axios from "axios";

const HomePage = () => {
  useEffect(() => {
    // Ambil token dari local storage
    const token = localStorage.getItem("token");
    // Atur header Authorization jika token ada
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);
  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default HomePage;
