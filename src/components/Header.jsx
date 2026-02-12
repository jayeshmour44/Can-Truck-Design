import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 

// 🔹 ICONS
import { 
  X, 
  Package,       
  Wrench,        
  Search,        
  FileText,      
  ListChecks,
  ChevronRight,
  ChevronLeft, 
  Home
} from "lucide-react";

// 🔹 IMPORT DATA (Ensure this path is correct)
import { categoriesData } from "../data/categoriesData"; 

/* 🔹 IMAGES (Ensure these paths are correct) */
import logo from "../assets/images/logo.png";
import catIcon from "../assets/images/icon-categories.png";
import partsIcon from "../assets/images/icon-parts-finder.png";
import catalogueIcon from "../assets/images/icon-catalogue.png";
import brandsIcon from "../assets/images/icon-brands.png";
import dropdownIcon from "../assets/images/icon-dropdown.png";
import searchIcon from "../assets/images/search.png"; 

// =============================================================================
// 🔹 MAIN HEADER COMPONENT
// =============================================================================
export default function Header({ onCatalogClick }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // 🔹 Navigation Handler (Resets Menu)
  const handleNavigation = (path) => {
    setMobileOpen(false);
    setShowCategories(false);
    navigate(path);
  };

  const handleCategoryClick = (categorySlug) => {
    setMobileOpen(false);
    setShowCategories(false);
    navigate(`/category/${categorySlug}`);
  };

  /* Scroll Lock */
  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : "auto"; }, [mobileOpen]);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".category-wrapper")) setShowCategories(false);
    };
    if (showCategories) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategories]);

  return (
    <header className="w-full font-sans relative z-50">
      {/* 🔹 TOP BAR */}
      <div className="bg-[#0C4BB2] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
           {/* Mobile Toggle Button */}
           <button className="lg:hidden text-2xl" onClick={() => setMobileOpen(true)}>☰</button>
           
           <img src={logo} alt="CTP" className="h-12 cursor-pointer" onClick={() => navigate('/')} />
           
           <nav className="hidden lg:flex gap-6 text-sm font-medium">
            {[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Support", path: "/support" },
              { name: "Brands", path: "/brands" },
              { name: "Contact", path: "/contact" }
            ].map((item) => (
              <a key={item.name} onClick={() => navigate(item.path)} className="hover:underline cursor-pointer">{item.name}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center bg-white rounded-md px-3 py-2 w-56">
            <img src={searchIcon} className="h-4 w-4 mr-2" alt="search" />
            <input className="outline-none text-sm text-black w-full" placeholder="Search" />
          </div>
        </div>
      </div>

      {/* 🔹 BUTTON BAR */}
      <div className="relative category-wrapper">
        <div className="bg-[#0B4DB8] py-3 hidden lg:block">
          <div className="max-w-7xl mx-auto flex gap-4 px-6">
            <DropdownButton 
                label="Categories" 
                icon={catIcon} 
                isOpen={showCategories} 
                onClick={(e) => { e.stopPropagation(); setShowCategories(!showCategories); }} 
            />
            <DropdownButton label="Parts Finder" icon={partsIcon} onClick={() => navigate('/parts-finder')} />
            <DropdownButton label="Catalogue" icon={catalogueIcon} onClick={onCatalogClick} />
            <DropdownButton label="Brands We Carry" icon={brandsIcon} onClick={() => navigate('/brands')} />
          </div>
        </div>

        {/* 🔹 DESKTOP MEGA MENU */}
        {showCategories && (
          <div className="relative z-40 category-wrapper">
            <MegaMenu 
                data={categoriesData} 
                onNavigate={(item) => handleCategoryClick(item.slug)} 
            />
          </div>
        )}
      </div>

      {/* 🔹 MOBILE MENU */}
      {mobileOpen && (
        <MobileMenu
          close={() => setMobileOpen(false)}
          data={categoriesData}
          onNavigateCategory={handleCategoryClick}
          onNavigateStatic={handleNavigation}
        />
      )}
    </header>
  );
}

// =============================================================================
// 🔹 HELPER COMPONENT: DROPDOWN BUTTON
// =============================================================================
function DropdownButton({ label, icon, isOpen, onClick, children }) {
    return (
      <div className="relative">
        <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold border transition ${isOpen ? "bg-[#0B4DB8] text-white" : "bg-white text-[#0B4DB8]"}`}>
          <img src={icon} alt="" className={`h-4 transition-all ${isOpen ? "invert brightness-0" : ""}`} style={!isOpen ? { filter: "invert(23%) sepia(89%) saturate(2600%) hue-rotate(205deg) brightness(90%) contrast(95%)" } : {}} />
          {label}
           <img src={dropdownIcon} alt="" className={`h-3 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180 invert brightness-0" : ""}`} style={!isOpen ? { filter: "invert(23%) sepia(89%) saturate(2600%) hue-rotate(205deg) brightness(90%) contrast(95%)" } : {}} />
        </button>
        {isOpen && children}
      </div>
    );
}

// =============================================================================
// 🔹 DESKTOP MEGA MENU (WITH BREADCRUMBS)
// =============================================================================
function MegaMenu({ data, onNavigate }) {
  const [history, setHistory] = useState([]);

  // Logic: Show children of last item, or root data
  const currentItems = history.length === 0 ? data : history[history.length - 1].children;

  const handleItemClick = (item) => {
    if (item.children && item.children.length > 0) {
      setHistory([...history, item]);
    } else {
      onNavigate(item);
    }
  };

  // Breadcrumb Logic
  const handleBreadcrumbClick = (index) => {
    if (index === -1) {
      setHistory([]); // Reset to Main
    } else {
      setHistory(history.slice(0, index + 1)); // Go back to specific level
    }
  };

  return (
    <div className="w-full bg-white shadow-xl px-10 py-8 text-sm absolute left-0 top-full border-t z-50">
      
      {/* Breadcrumbs Header */}
      <div className="flex items-center gap-2 text-gray-500 mb-6 border-b pb-2 text-[15px]">
        <span 
          className={`cursor-pointer hover:text-[#0C4BB2] hover:underline ${history.length === 0 ? "font-bold text-[#0C4BB2]" : ""}`}
          onClick={() => handleBreadcrumbClick(-1)}
        >
          All Categories
        </span>

        {history.map((item, index) => {
          const isLast = index === history.length - 1;
          return (
            <div key={item._id} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-gray-400" />
              <span 
                className={`cursor-pointer hover:text-[#0C4BB2] hover:underline ${isLast ? "font-bold text-[#0C4BB2]" : ""}`}
                onClick={() => handleBreadcrumbClick(index)}
              >
                {item.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Grid Content */}
      {(!currentItems || currentItems.length === 0) ? (
         <p className="text-gray-500 italic">No sub-categories found.</p>
      ) : (
<div className="grid grid-rows-[repeat(5,min-content)] grid-flow-col gap-x-12 gap-y-3 h-auto">  
          {currentItems.slice(0, 20).map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center cursor-pointer group hover:bg-blue-50 p-2 rounded transition max-w-[300px]"
            onClick={() => handleItemClick(item)}
          >
            <span className="text-[15px] text-gray-700 font-medium group-hover:text-[#0C4BB2]">
              {item.name}
            </span>

            {item.children?.length > 0 && (
              <ChevronRight
                size={16}
                className="text-gray-300 group-hover:text-[#0C4BB2]"
              />
            )}
          </div>
        ))}
      </div>
      )}
{/* 🔹 Bottom Text (Sirf tab dikhega jab 20 se zyada items honge) */}
    {currentItems.length > 20 && (
      <div className="border-t border-gray-200 mt-6 pt-4 text-center w-full">
        <Link to="/categories" className="text-sm font-semibold text-[#0C4BB2] hover:underline">
          View All Categories
        </Link>
       
      </div>
    )}

         </div>
  );
}


// =============================================================================
// 🔹 MOBILE MENU (WITH SCROLLABLE BREADCRUMBS)
// =============================================================================
function MobileMenu({ close, data, onNavigateCategory, onNavigateStatic }) {
    
    const [history, setHistory] = useState([]);

    // Static Items
    const mainMenuItems = [
        { name: "Find Service", icon: <Wrench size={20} />, path: '/find-service', hasArrow: true },
        { name: "Parts Finder", icon: <Search size={20} />, path: '/parts-finder', hasArrow: true },
        { name: "Diagrams", icon: <FileText size={20} />, path: '/diagrams', hasArrow: true },
        { name: "Quick Order", icon: <ListChecks size={20} />, path: '/quick-order', hasArrow: false }
    ];

    const bottomLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Support", path: "/support" },
        { name: "Brands", path: "/brands" },
        { name: "Contact", path: "/contact" }
    ];

    const currentList = history.length === 0 ? data : history[history.length - 1].children;
    const isMainMenu = history.length === 0;

    const handleItemClick = (item) => {
        if (item.children && item.children.length > 0) {
            setHistory([...history, item]);
        } else {
            onNavigateCategory(item.slug);
        }
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const handleBreadcrumbClick = (index) => {
        if (index === -1) {
            setHistory([]);
        } else {
            setHistory(history.slice(0, index + 1));
        }
    };

    return (
      <div className="fixed inset-0 z-50 bg-black/40 text-[#0C4BB2] lg:hidden animate-fade-in">
        
        <div className="w-[85%] max-w-[350px] h-full bg-white flex flex-col shadow-2xl animate-slide-in">
          
          {/* Header */}
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center sticky top-0 z-10 shrink-0">
             <div className="flex items-center gap-2">
                 {!isMainMenu && (
                     <button onClick={handleBack} className="p-1 hover:bg-gray-200 rounded-full mr-1">
                         <ChevronLeft size={22} className="text-[#0C4BB2]" />
                     </button>
                 )}
                 <h3 className="font-bold text-lg text-gray-800 truncate max-w-[200px]">
                     {isMainMenu ? "Menu" : history[history.length - 1].name}
                 </h3>
             </div>

             <button onClick={close} className="p-1 hover:bg-gray-200 rounded-full">
                <X size={24} className="text-gray-600" />
             </button>
          </div>

          {/* Breadcrumbs (Scrollable) */}
          {!isMainMenu && (
             <div className="px-4 py-2 bg-blue-50 border-b flex items-center gap-1 overflow-x-auto whitespace-nowrap text-xs no-scrollbar">
                <span onClick={() => handleBreadcrumbClick(-1)} className="text-gray-500 cursor-pointer hover:text-[#0C4BB2] flex-shrink-0">All</span>
                
                {history.map((item, index) => (
                    <div key={item._id} className="flex items-center gap-1 flex-shrink-0">
                        <ChevronRight size={10} className="text-gray-400" />
                        <span 
                            onClick={() => handleBreadcrumbClick(index)}
                            className={`cursor-pointer ${index === history.length - 1 ? "font-bold text-[#0C4BB2]" : "text-gray-500 hover:text-[#0C4BB2]"}`}
                        >
                            {item.name}
                        </span>
                    </div>
                ))}
             </div>
          )}
  
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">

            {/* A. MAIN MENU */}
            {isMainMenu && (
              <div className="flex flex-col">
                  <div className="flex flex-col">
                     {mainMenuItems.map((item, index) => (
                         <div key={index} onClick={() => onNavigateStatic(item.path)} className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50">
                             <div className="flex items-center gap-4">
                                 <span className="text-[#0C4BB2]">{item.icon}</span>
                                 <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                             </div>
                             {item.hasArrow && <ChevronRight size={18} className="text-gray-400" />}
                         </div>
                     ))}
                  </div>
                  <div className="p-4 bg-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                     Categories
                  </div>
              </div>
            )}

            {/* B. DYNAMIC LIST */}
            <div className="flex flex-col">
                {currentList && currentList.map((item) => (
                    <div 
                        key={item._id} 
                        className="flex justify-between items-center p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 active:bg-blue-100 transition-colors"
                        onClick={() => handleItemClick(item)}
                    >
                        <span className="font-medium text-gray-700 text-[15px]">{item.name}</span>
                        {item.children && item.children.length > 0 && <ChevronRight size={18} className="text-gray-400" />}
                    </div>
                ))}

                {!isMainMenu && (!currentList || currentList.length === 0) && (
                    <div className="p-6 text-center text-gray-500 italic text-sm">No items found.</div>
                )}
            </div>

            {/* C. BOTTOM LINKS */}
            {isMainMenu && (
                 <div className="flex flex-col bg-gray-50 p-4 gap-4 mt-auto border-t">
                    {bottomLinks.map((link, index) => (
                        <p key={index} className="text-gray-600 font-medium text-sm cursor-pointer hover:text-[#0C4BB2]" onClick={() => onNavigateStatic(link.path)}>
                            {link.name}
                        </p>
                    ))}
                 </div>
            )}
          </div>
        </div>
      </div>
    );
}