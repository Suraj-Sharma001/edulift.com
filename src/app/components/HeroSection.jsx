import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#232946] to-[#121629] text-[#fffffe] text-center py-20 px-6 shadow-lg">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#eebbc3]">
          Empowering Students, One Scholarship at a Time
        </h1>
        <p className="text-xl mb-8 text-[#b8c1ec]">
          Unlock education opportunities — get support or contribute to help students succeed.
        </p>
        <button className="bg-[#eebbc3] text-[#232946] px-8 py-4 rounded-full font-semibold hover:bg-[#b8c1ec] hover:text-[#232946] transition-all duration-300 shadow-md transform hover:-translate-y-1">
          Get Started
        </button>
      </div>
    </section>
  );  
}
