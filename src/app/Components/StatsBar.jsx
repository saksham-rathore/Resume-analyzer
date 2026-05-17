import React from "react";

function StatsBar() {
  const stats = [
    { label: "Active Listings", value: "2.4M+" },
    { label: "Match Accuracy", value: "94%" },
    { label: "Careers Placed", value: "340K" },
    { label: "User Rating", value: "4.9★" },
  ];

  return (
    <div className="w-full border-y border-gray-100 py-12 mt-20 mb-20 animate-soft-up delay-200">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`text-center ${index !== stats.length - 1 ? "md:border-r border-gray-100" : ""}`}
          >
            <div className="text-3xl md:text-5xl font-black bit-font mb-2 tracking-tight leading-tight py-2 bg-gradient-to-t from-gray-400 to-black bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 heading-font">
              {stat.label}
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default StatsBar;
