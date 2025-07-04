import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-orange-300 text-white text-center py-20 px-6 shadow-lg">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Empowering Students, One Scholarship at a Time
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          Unlock education opportunities — get support or contribute to help students succeed.
        </p>
        <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-md transform hover:-translate-y-1">
          Get Started
        </button>
      </div>
    </section>
  );  
}
