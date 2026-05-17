import React from "react";
import { motion } from "framer-motion";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative flex flex-col justify-center items-center pt-48 pb-20 px-4 text-center grid-pattern overflow-hidden"
    >
      {/* Architectural Background Triangle */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] -z-10 pointer-events-none"
        style={{
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          background: "linear-gradient(180deg, #000 0%, transparent 100%)",
          border: "1px solid black",
        }}
      />
      
      <motion.div 
        variants={itemVariants}
        className="glass border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] px-2 py-2 rounded-full mb-12 cursor-default relative overflow-hidden group"
      >
        <span className="relative z-10 text-[11px] font-bold tracking-[0.1em] text-gray-500 bit-font uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
          Revolutionizing Job Search
        </span>
      </motion.div>

      <div className="relative z-50 flex flex-col gap-0 mb-12 items-center">
        <motion.h1 
          variants={itemVariants}
          className="text-[50px] md:text-[90px] font-black tracking-tight leading-[0.8] text-gray-900 uppercase py-2 text-gradient-subtle"
        >
          Find jobs
        </motion.h1>
        <motion.h1 
          variants={itemVariants}
          className="text-[55px] md:text-[100px] font-black tracking-tight leading-[0.8] text-gradient uppercase py-2"
        >
          that actually
        </motion.h1>
        <motion.h1 
          variants={itemVariants}
          className="text-[60px] md:text-[110px] font-black tracking-tight leading-[0.8] uppercase py-2 bg-gradient-to-t from-gray-500 to-black bg-clip-text text-transparent"
        >
          match you
        </motion.h1>
      </div>

      <motion.div 
        variants={itemVariants}
        className="relative z-50 text-gray-400 text-[13px] md:text-[15px] max-w-lg mx-auto leading-relaxed font-medium"
      >
        <span className="block italic">Jobfolio leverages next-gen AI to bridge the gap</span>
        <span className="block">between talent and opportunity.</span>
        <span className="block text-gray-900 font-bold mt-2">Your career journey, simplified.</span>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-16 flex flex-col md:flex-row gap-8 relative z-50"
      >
        <button className="bg-white text-black px-10 py-5 rounded-sm font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-700 shadow-lg side-shine group">
          Get Started Now 
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
        <button className="bg-transparent text-gray-900 px-10 py-5 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 relative group overflow-hidden">
          <span className="relative z-10">View Demo</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
          <div className="absolute bottom-4 left-8 right-8 h-[1px] bg-gray-900 origin-left scale-x-100 group-hover:bg-black transition-all"></div>
        </button>
      </motion.div>

    </motion.div>
  );
}

export default Hero;
