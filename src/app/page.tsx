import Footer from "@/Components/Layout/Footer";
import Navbar from "@/Components/Layout/Navbar";
import Banners from "@/Components/Section/Banners";
import CTA from "@/Components/Section/CTA";
import Hero from "@/Components/Section/Hero";
import Features from "@/Components/UI/Features";
import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Banners />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}