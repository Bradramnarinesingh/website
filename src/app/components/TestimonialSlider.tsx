'use client';

import { useState, useEffect } from 'react';
import RollingNumber from './RollingNumber';

const testimonials = [
  {
    quote: "This program gave me the confidence to speak up in class and now I'm mentoring younger students. It completely changed my perspective on what I'm capable of.",
    author: "Sarah Martinez",
    role: "Program Graduate, Age 17",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    impact: "Now mentoring 5 younger students"
  },
  {
    quote: "Giving $25 a month is the easiest high-impact habit I have. Seeing the monthly reports makes me feel connected to the change happening.",
    author: "Michael Chen",
    role: "Monthly Donor since 2022",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    impact: "Supporting 12 workshop sessions"
  },
  {
    quote: "The leadership workshops helped me find my voice when I needed it most. I went from barely speaking to leading our school's student council.",
    author: "Emma Rodriguez", 
    role: "Student Council President, Age 16",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    impact: "Leading 200+ student initiatives"
  },
  {
    quote: "The impact reports I receive make me feel like I'm part of something bigger. Every dollar truly makes a difference in these young lives.",
    author: "Lisa Thompson",
    role: "Corporate Partner & Donor",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face",
    impact: "Funded 24 mentorship pairs"
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Stories of Impact</h2>
          <p className="text-xl text-gray-600">Real voices from our community of changemakers</p>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100 min-h-[400px] flex items-center">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img 
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].author}
                      className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">💬</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <blockquote className="text-2xl lg:text-3xl text-gray-800 font-medium leading-relaxed mb-8 italic">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                  
                  <div className="space-y-3">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {testimonials[currentIndex].author}
                        </div>
                        <div className="text-purple-600 font-medium">
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                      
                      <div className="mt-4 lg:mt-0">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
                          <span className="text-lg">✨</span>
                          {testimonials[currentIndex].impact}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-12">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200 group"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all border border-gray-200 group"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              💪
            </div>
            <RollingNumber 
              value={95} 
              suffix="%" 
              className="text-2xl font-bold text-gray-900"
              duration={1500}
              delay={200}
            />
            <div className="text-gray-600">Confidence increase</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              🎯
            </div>
            <RollingNumber 
              value={87} 
              suffix="%" 
              className="text-2xl font-bold text-gray-900"
              duration={1500}
              delay={400}
            />
            <div className="text-gray-600">Leadership roles</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              🤝
            </div>
            <RollingNumber 
              value={78} 
              suffix="%" 
              className="text-2xl font-bold text-gray-900"
              duration={1500}
              delay={600}
            />
            <div className="text-gray-600">Become mentors</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              🌟
            </div>
            <RollingNumber 
              value={92} 
              suffix="%" 
              className="text-2xl font-bold text-gray-900"
              duration={1500}
              delay={800}
            />
            <div className="text-gray-600">Recommend program</div>
          </div>
        </div>
      </div>
    </section>
  );
} 