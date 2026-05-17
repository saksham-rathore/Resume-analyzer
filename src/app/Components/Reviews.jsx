import React from 'react'

const reviews = [
  {
    name: "Said Aitmbarek",
    handle: "@SaidAitmbarek",
    text: "looks beautifully designed mate. impressive collection of components + visuals",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Said"
  },
  {
    name: "Terry Carson",
    handle: "@mrterrycarson",
    text: "Congrats on reaching the final stretch. Can't wait to try it out once it goes live.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Terry"
  },
  {
    name: "Karan Singh",
    handle: "@heykaran77",
    text: "can't wait to use it!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan"
  },
  {
    name: "Zahid Mushtaq",
    handle: "@zahid18_19",
    text: "your designs are really good",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zahid"
  },
  {
    name: "Aniket Pawar",
    handle: "@alaymanguy",
    text: "The library is sick indeed, way to go 🔥",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aniket"
  },
  {
    name: "Akash Parmar",
    handle: "@AkashDev001",
    text: "This library looks sick bro",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akash"
  }
]

function ReviewCard({ review }) {
  return (
    <div className="flex-shrink-0 w-[350px] p-6 mx-4 rounded-3xl bg-[#0d0d0d] border border-white/5 shadow-xl hover:border-white/20 transition-all duration-300">
      <p className="text-gray-400 text-sm leading-relaxed mb-6 h-12 overflow-hidden">
        {review.text}
      </p>
      <div className="flex items-center gap-3 border-t border-white/5 pt-4">
        <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full bg-gray-800" />
        <div>
          <h4 className="text-white text-xs font-bold">{review.name}</h4>
          <p className="text-gray-500 text-[10px]">{review.handle}</p>
        </div>
        <div className="ml-auto text-gray-600 text-[10px]">𝕏</div>
      </div>
    </div>
  )
}

function Reviews() {
  return (
    <div className="py-24 overflow-hidden bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.02),0_1px_3px_rgba(0,0,0,0.02)] relative">
      <div className="text-center mb-16 px-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4 block">Testimonials</span>
        <h2 className="text-4xl font-black bit-font text-gray-900 mb-6 tracking-[-0.07em] leading-[0.85] uppercase">Trusted by the best</h2>
        <p className="text-gray-500 max-w-lg mx-auto text-sm">Join thousands of professionals finding their dream roles every day.</p>
      </div>


      <div className="relative">
        {/* Side Gradients for Fade Effect */}
        <div className="absolute top-0 left-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

        {/* First Row - Moving Left */}
        <div className="flex w-max animate-marquee whitespace-nowrap mb-8 mt-10">
          {[...reviews, ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>

        {/* Second Row - Moving Right */}
        <div className="flex w-max animate-marquee-reverse whitespace-nowrap">
          {[...reviews.reverse(), ...reviews, ...reviews].map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}


export default Reviews
