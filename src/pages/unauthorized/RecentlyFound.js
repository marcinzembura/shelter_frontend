import React from "react";
import "../../App.css";
import RecentlyFoundComponent from "../../components/homePage/RecentlyFoundComponent";
import Footer from "../../components/homePage/Footer";
import Navbar from "../../components/homePage/Navbar";

export default function RecentlyFound() {
  return (
    <>
      <Navbar />
      <RecentlyFoundComponent />
      <Footer/>
    </>
  );
}
