import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, PackageOpen } from 'lucide-react';

// 🔹 DATA IMPORT (Aapki file se)
import { categoriesData } from "../data/categoriesData";

const CategoriesPage = () => {
  const navigate = useNavigate();
  
  // 🔹 STATE FOR FILTERS
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");

  // 🔹 ALPHABET ARRAY (A-Z)
  const alphabet = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  // 🔹 FILTERING LOGIC
  const filteredCategories = categoriesData.filter((cat) => {
    // 1. Check Search Term
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    // 2. Check Alphabet Filter
    const matchesLetter = selectedLetter === "All" || cat.name.startsWith(selectedLetter);
    
    return matchesSearch && matchesLetter;
  });

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* ======================= 1. HERO HEADER ======================= */}
      <div className=" py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Browse All Categories</h1>
          <p className="text-blue-600 text-lg mb-8 max-w-2xl mx-auto">
            Find the right parts for your truck. Search by category name or browse our extensive catalog below.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative group">
            <input 
              type="text" 
              placeholder="Search e.g. Engine, Brakes, Suspension..." 
              className="w-full py-4 pl-12 pr-4 rounded-full text-gray-800 outline-none focus:ring-4 focus:ring-blue-400/50 shadow-2xl transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-4 text-gray-400 group-focus-within:text-[#0C4BB2]" size={22} />
          </div>
        </div>
      </div>

      {/* ======================= 2. MAIN LAYOUT ======================= */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* --- LEFT SIDEBAR (Sticky Filters) --- */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
            
            <div className="flex items-center gap-2 mb-4 text-[#0C4BB2] border-b pb-2">
              <Filter size={20} />
              <h3 className="font-bold text-lg">Filter by Name</h3>
            </div>
            
            {/* A-Z Buttons Grid */}
            <div className="grid grid-cols-5 gap-2">
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`py-1.5 rounded text-xs font-bold transition-all ${
                    selectedLetter === letter 
                      ? "bg-[#0C4BB2] text-white shadow-md transform scale-105" 
                      : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-[#0C4BB2]"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>

            {/* Helper Text */}
            <div className="mt-6 text-xs text-gray-400 text-center">
              Showing {filteredCategories.length} categories
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE (Categories Grid) --- */}
        <div className="w-full lg:w-3/4">
          
          {/* Header Line */}
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold text-gray-800">
               {selectedLetter === "All" ? "All Categories" : `Categories starting with "${selectedLetter}"`}
             </h2>
          </div>

          {/* GRID */}
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {filteredCategories.map((category) => (
                <div 
                  key={category._id} 
                  onClick={() => navigate(`/category/${category.slug}`)} // Navigate on click
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group overflow-hidden flex flex-col"
                >
                  {/* Card Header / Image Placeholder */}
                  <div className="h-28 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative border-b border-gray-100">
                    <PackageOpen size={40} className="text-gray-300 group-hover:text-[#0C4BB2] transition-colors duration-300" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0C4BB2]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#0C4BB2] transition-colors mb-2 line-clamp-1">
                        {category.name}
                        </h3>
                    </div>
                    
                    {/* Sub-categories Preview (Real World Touch) */}
                    <div className="text-sm text-gray-500 mb-4 flex-1">
                      {category.children && category.children.length > 0 ? (
                        <p className="line-clamp-2 leading-relaxed">
                            {category.children.map(c => c.name).join(", ")}
                        </p>
                      ) : (
                        <span className="italic text-gray-400">No sub-categories</span>
                      )}
                    </div>

                    {/* View Button */}
                    <div className="flex items-center text-[#0C4BB2] text-sm font-bold group-hover:gap-2 transition-all mt-auto">
                      View Products <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            // --- EMPTY STATE (Agar search mein kuch na mile) ---
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                <Search size={40} className="text-[#0C4BB2]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">No categories found</h3>
              <p className="text-gray-500 mt-2">We couldn't find any category matching "{searchTerm}".</p>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedLetter("All"); }}
                className="mt-6 px-6 py-2 bg-[#0C4BB2] text-white rounded-lg hover:bg-blue-700 transition"
              >
                Clear Filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;