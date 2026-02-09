import { useState } from "react";
import Header from "../components/Header";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";

import airbrake from "../assets/images/products/air-brake.png";
import airhoses from "../assets/images/products/air-hoses.png";
import airtanks from "../assets/images/products/air-tanks.png";
import suspensionbushes from "../assets/images/products/suspension-bushes.png";
import hubcaps from "../assets/images/products/hub-caps.png";
import pressurevalve from "../assets/images/products/pressure-valve.png";

import airsystem from "../assets/images/categories/air-system.png";
import airbrakevalve from "../assets/images/categories/air-brake-valve.png";
import airhosestubes from "../assets/images/categories/air-hoses.png";
import airtank from "../assets/images/categories/air-tanks.png";

import arrowLeft from "../assets/images/ui/arrow-left.png";
import arrowRight from "../assets/images/ui/arrow-right.png";

/* 🔹 TEMP PRODUCT DATA */
const products = [
  { id: 1, title: "Air Brake Valves", price: "CAD20.56", img: airbrake },
  { id: 2, title: "Air Hoses & Tubes", price: "CAD10.52", img: airhoses },
  { id: 3, title: "Air Tanks", price: "CAD20.50", img: airtanks },
  {
    id: 4,
    title: "Suspension Bushes",
    price: "CAD15.49",
    img: suspensionbushes,
  },
  { id: 5, title: "Hub Caps", price: "CAD25.69", img: hubcaps },
  {
    id: 6,
    title: "Pressure Protection Valves",
    price: "CAD22.45",
    img: pressurevalve,
  },
];

const categories = [
  { title: "Air System", icon: airsystem },
  { title: "Air Brake Valves", icon: airbrakevalve },
  { title: "Air Hoses & Tubes", icon: airhosestubes },
  { title: "Air Tanks", icon: airtank },
];

export default function CategoryPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
       {/* <Header />  */}

      {/* 🔹 TOP SECTION */}
      <div className="bg-[#EFF3FF] pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0B4DB8]">
                Air System
              </h1>
              <p className="text-sm text-[#0B4DB8] mt-1 font-bold">
                Shop By Category
              </p>
            </div>

            <div className="flex gap-2">
              <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#0B4DB8] rounded">
                <img src={arrowLeft} className="h-3 w-3" />
              </button>
              <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#0B4DB8] rounded">
                <img src={arrowRight} className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* CATEGORY CARDS */}
          <div className="overflow-x-auto">
            <div className="flex gap-3 w-max pb-6">
              {categories.map((cat) => (
                <div
                  key={cat.title}
                  className="flex items-center justify-between min-w-[220px] sm:min-w-[260px] lg:min-w-[290px] border border-[#9DB7FF] rounded-md px-4 sm:px-5 py-4 bg-[#F5F8FF]"
                >
                  <span className="font-semibold text-sm text-[#0B4DB8]">
                    {cat.title}
                  </span>
                  <img
                    src={cat.icon}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 CONTENT SECTION */}
      <div className="bg-gradient-to-b from-[#0B4DB8] to-[#CFE0FF] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6 items-start">

          {/* MOBILE FILTER BUTTON */}
          <div className="flex lg:hidden justify-end w-full">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="bg-white text-[#0B4DB8] px-4 py-2 rounded-md text-sm font-semibold shadow"
            >
              Filter ☰
            </button>
          </div>

          {/* DESKTOP FILTER */}
          <div className="hidden lg:block w-[260px]">
            <FilterSidebar />
          </div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 flex-1">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 text-center sm:text-right">
          <button className="bg-[#0B4DB8] text-white px-6 py-2 rounded-md text-sm font-semibold shadow">
            Show More →
          </button>
        </div>
      </div>

      {/* 🔹 MOBILE RIGHT FILTER DRAWER */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isFilterOpen ? "visible" : "invisible"
        }`}
      >
        {/* backdrop */}
        <div
          onClick={() => setIsFilterOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            isFilterOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl transform transition-transform duration-300
            ${isFilterOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold text-[#0B4DB8]">Filters</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="text-xl font-bold text-[#0B4DB8]"
            >
              ×
            </button>
          </div>

          <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
            <FilterSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
