import Footer from "@/Components/Layout/Footer";
import Navbar from "@/Components/Layout/Navbar";
import Banners from "@/Components/Section/Banners";
import Hero from "@/Components/Section/Hero";
import Connectors from "@/Components/UI/Connectors";
import Features from "@/Components/UI/Features";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Banners />
      <Connectors />
      <Features />
      <Footer />
    </div>
  );
}