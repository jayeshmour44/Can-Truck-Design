import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Home, ChevronLeft, Search } from 'lucide-react';
import * as Icons from 'lucide-react'; // Dynamic Icons ke liye

// 🔹 DATA IMPORT
import { categoriesData } from '../data/categoriesData';

const SingleCategoryPage = () => {
  const { slug } = useParams(); // URL se slug milega (e.g., 'automotive-parts')
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  // 🔹 Find Data based on Slug
  useEffect(() => {
    // Recursive search function to find category anywhere in the tree
    const findCategory = (items, targetSlug) => {
      for (const item of items) {
        if (item.slug === targetSlug) return item;
        if (item.children && item.children.length > 0) {
          const found = findCategory(item.children, targetSlug);
          if (found) return found;
        }
      }
      return null;
    };

    const foundCategory = findCategory(categoriesData, slug);
    setCategory(foundCategory);
  }, [slug]);

  // 🔹 Helper: Get Icon
  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent size={32} strokeWidth={1.5} /> : <Icons.PackageOpen size={32} />;
  };

  if (!category) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans pb-20">
      
      {/* ======================= 1. BREADCRUMBS & HEADER ======================= */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-[#0C4BB2] flex items-center gap-1"><Home size={14} /> Home</Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/categories" className="hover:text-[#0C4BB2]">Categories</Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="font-semibold text-[#0C4BB2]">{category.name}</span>
          </div>

          {/* Title Section */}
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-[#0C4BB2] rounded-xl">
               {getIconComponent(category.icon)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-500 text-sm mt-1">
                Explore all sub-categories and parts under {category.name}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ======================= 2. MAIN CONTENT ======================= */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-600 hover:text-[#0C4BB2] font-medium transition">
           <ChevronLeft size={20} /> Back to Categories
        </button>

        {/* --- Sub-Categories Grid --- */}
        {category.children && category.children.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {category.children.map((subCat) => (
              <div 
                key={subCat._id}
                onClick={() => navigate(`/category/${subCat.slug}`)} // Click par firse yehi page load hoga naye data ke sath
                className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 cursor-pointer transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                   {/* Icon */}
                   <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-[#0C4BB2] group-hover:bg-blue-50 transition-colors">
                      {getIconComponent(subCat.icon)}
                   </div>
                   <ChevronRight size={18} className="text-gray-300 group-hover:text-[#0C4BB2]" />
                </div>

                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#0C4BB2] mb-1">
                  {subCat.name}
                </h3>
                
                {/* Agar iske andar bhi children hain to count dikhao */}
                <p className="text-sm text-gray-500">
                  {subCat.children?.length > 0 ? `${subCat.children.length} Sub-categories` : "View Products"}
                </p>
              </div>
            ))}

          </div>
        ) : (
          // --- EMPTY STATE (Leaf Node) ---
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="bg-green-50 p-4 rounded-full inline-block mb-4">
               <Icons.CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Browse Products</h2>
            <p className="text-gray-500 mt-2 mb-6">
               You have reached the final category. View products listed under <b>{category.name}</b>.
            </p>
            <button className="bg-[#0C4BB2] text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
               View All Products in {category.name}
            </button>
          </div>
        )}

      </div>

    </div>
  );
};

export default SingleCategoryPage;