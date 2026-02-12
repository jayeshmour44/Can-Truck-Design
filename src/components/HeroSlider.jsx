import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';

// Images Import
import img1 from '../assets/images/slides/1.png';
import img2 from '../assets/images/slides/2.png';
import img3 from '../assets/images/slides/3.png';

// CSS Imports
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 DUMMY API CALL
  useEffect(() => {
    setTimeout(() => {
      const apiData = [
        {
          id: 1,
          heading: "Quality Truck Parts",
          paragraph: "Find the best engine components and accessories.",
          buttonText: "Shop Now",
          image: img1
        },
        {
          id: 2,
          heading: "Keep On Rolling",
          paragraph: "Reliable suspension & braking systems for safety.",
          buttonText: "View Catalog",
          image: img2
        },
        {
          id: 3,
          heading: "Expert Support 24/7",
          paragraph: "Our team is ready to help you find the right part.",
          buttonText: "Contact Us",
          image: img3
        }
      ];
      setSlides(apiData);
      setLoading(false);
    }, 1000);
  }, []);

  // 🔹 ALIGNMENT LOGIC
  const getContentAlignment = (index) => {
    if (index === 0) return "items-start text-left mr-auto";
    if (index === 1) return "items-center text-center mx-auto";
    if (index === 2) return "items-end text-right ml-auto";
    return "items-start text-left mr-auto";
  };

// 🔹 LOADING STATE (Skeleton Effect)
  if (loading) return (
    <div className="w-full h-[300px] md:h-[350px] bg-gray-800 relative overflow-hidden">
      {/* Pulse Animation Container */}
      <div className="animate-pulse w-full h-full flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* 1. Heading Skeleton */}
        <div className="h-8 md:h-12 bg-gray-300 rounded w-3/4 md:w-1/2 mb-4"></div>
        
        {/* 2. Text Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-full md:w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 md:w-1/2 mb-6"></div>
        
        {/* 3. Button Skeleton */}
        <div className="h-10 w-36 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
  return (
    // 🔹 HEIGHT: Mobile 300px | Desktop 350px
    <div className="w-full h-[300px] md:h-[350px] relative group font-sans">
      
      {/* 🔹 CUSTOM PAGINATION STYLES (Isse ensure karein ki ye styles apply hon) */}
      <style>{`
        .swiper-pagination-bullet {
          width: 10px !important;
          height: 10px !important;
          background-color: rgba(255, 255, 255, 0.6) !important;
          opacity: 1 !important;
          margin: 0 6px !important;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background-color: transparent !important; /* Center transparent taaki border dikhe */
          border: 6px solid #0B4DB8 !important;   /* Blue Border/Dot */
          transform: scale(1.3);
          box-shadow: 0 0 0 3px transparent, 0 0 0 4px #fff; /* White Outer Ring */
        }
      `}</style>

      <Swiper
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="bg-black">
            <div className="relative w-full h-full flex flex-col justify-center px-6 md:px-12">
              
              {/* Background Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[2000ms] scale-100 group-hover:scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              {/* Text Content */}
              <div className="relative z-10 w-full max-w-7xl mx-auto">
                
                <div className={`flex flex-col gap-3 max-w-xl ${getContentAlignment(index)}`}>
                  
                  {/* Heading */}
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg animate-fade-in-up">
                    {slide.heading}
                  </h1>

                  {/* Paragraph */}
                  <p className="text-sm md:text-lg text-gray-100 font-medium drop-shadow-md max-w-lg line-clamp-2 animate-fade-in-up delay-100">
                    {slide.paragraph}
                  </p>

                  {/* Button */}
                  <button className="mt-2 bg-[#0C4BB2] hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-all hover:gap-3 shadow-xl border border-[#0C4BB2] hover:border-blue-400 w-fit animate-fade-in-up delay-200">
                    {slide.buttonText} <ArrowRight size={18} />
                  </button>

                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;