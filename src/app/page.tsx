import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Simulator from '@/components/landing/Simulator';
import Features from '@/components/landing/Features';
import Process from '@/components/landing/Process';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="mesh-bg min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 landing-sections-stack py-12">
        <Hero />
        <Stats />
        <Simulator />
        <Features />
        <Process />
        <Testimonials />
        <CTA />


      </main>

      <Footer />
    </div>
  );
}