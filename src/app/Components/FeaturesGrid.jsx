import React from "react";

function FeaturesGrid() {
  const features = [
    {
      number: "01",
      title: "AI Matching",
      description:
        "Deep semantic analysis aligns your unique profile with opportunities that truly fit.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "Smart Insights",
      description:
        "Real-time market intelligence and compensation benchmarks at your fingertips.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Career Pathfinding",
      description:
        "Personalized roadmaps that guide your next step with clarity and precision.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-32 mb-40 px-4">
      <div className="text-center mb-16 animate-soft-up delay-300">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 mb-4 block">
          Why Jobfolio
        </span>
        <h2 className="text-4xl md:text-6xl font-black bit-font mb-6 tracking-tight leading-tight py-2 bg-gradient-to-t from-gray-400 to-black bg-clip-text text-transparent">
          The future of recruiting
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Experience features designed for the modern workforce — precision,
          elegance, results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-100 rounded-[2.5rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`group p-12 flex flex-col items-start transition-all duration-500 animate-soft-up ${
              index !== features.length - 1 ? "md:border-r border-gray-100" : ""
            } hover:bg-gray-50`}
          >
            <div className="text-[11px] font-bold text-gray-300 mb-8 tracking-widest">
              {feature.number}
            </div>
            <div className="w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center text-gray-900 mb-8 group-hover:scale-110 transition-transform duration-500 bg-white">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 bit-font tracking-tight">
              {feature.title}
            </h3>
            <p className="text-gray-400 leading-relaxed text-[13px] font-medium">
              {feature.description}
            </p>
            <div className="mt-12 flex items-center text-[11px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-black transition-colors cursor-pointer">
              Explore{" "}
              <span className="ml-2 transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 animate-bounce">
        <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
          ↓
        </div>
      </div>
    </div>
  );
}

export default FeaturesGrid;
