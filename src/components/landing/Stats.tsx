'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: any) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 90,
      damping: 18,
      delay: custom * 0.12,
    },
  }),
};

export default function Stats() {
  return (
    <section className="bg-slate-50/60 border-y border-slate-200/50 py-12 px-6">
      <div className="landing-content-width mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={statItemVariants}
          className="p-4"
        >
          <span className="block text-4xl md:text-5xl font-cabinet font-extrabold text-slate-800 mb-1">120,400+</span>
          <span className="text-sm font-medium text-slate-500">Resumes Scanned & Audited</span>
        </motion.div>
        
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={statItemVariants}
          className="p-4 border-y md:border-y-0 md:border-x border-slate-200/60"
        >
          <span className="block text-4xl md:text-5xl font-cabinet font-extrabold text-slate-800 mb-1">+32%</span>
          <span className="text-sm font-medium text-slate-500">Average Response Rate Boost</span>
        </motion.div>
        
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={statItemVariants}
          className="p-4"
        >
          <span className="block text-4xl md:text-5xl font-cabinet font-extrabold text-slate-800 mb-1">94.8%</span>
          <span className="text-sm font-medium text-slate-500">Applicant Interview Placement Rate</span>
        </motion.div>
      </div>
    </section>
  );
}
