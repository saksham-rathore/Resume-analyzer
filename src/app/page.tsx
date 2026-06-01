import React from 'react';
import Navbar from "@/components/landing/Navbar";
import Content from "@/components/landing/Content";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[oklch(95%_0.008_264.534)] via-[oklch(98.5%_0.003_264.534)] to-white overflow-x-hidden flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="mx-auto max-w-[1200px] px-6 md:px-12">
          <Content />
        </main>
      </div>

      <Footer />
    </div>
  );
}