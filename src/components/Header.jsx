import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

// 🔹 ICONS IMPORT
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Package,       
  Wrench,        
  Search,        
  FileText,      
  ListChecks     
} from "lucide-react";

// 🔹 IMPORT DATA
import { categoriesData } from "../data/categoriesData"; 

/* 🔹 IMAGES */
import logo from "../assets/images/logo.png";
import catIcon from "../assets/images/icon-categories.png";
import partsIcon from "../assets/images/icon-parts-finder.png";
import catalogueIcon from "../assets/images/icon-catalogue.png";
import brandsIcon from "../assets/images/icon-brands.png";
import dropdownIcon from "../assets/images/icon-dropdown.png";
import arrowRight from "../assets/images/arrow-right.png";
import searchIcon from "../assets/images/search.png"; 

export default function Header({ onCatalogClick }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // Mobile States
  const [mobileLevel1, setMobileLevel1] = useState(null);
  const [mobileSelectedCategory, setMobileSelectedCategory] = useState(null);
  const [mobileSelectedSubCat, setMobileSelectedSubCat] = useState(null);

  // 🔹 1. CATEGORY NAVIGATION (Drill Down Leaf Node)
  const handleCategoryNavigation = (item) => {
    if (item.children && item.children.length > 0) return;

    // Reset everything, Close Menu & Navigate
    setShowCategories(false); 
    setMobileOpen(false);    
    setMobileLevel1(null);
    setMobileSelectedCategory(null);
    setMobileSelectedSubCat(null);

    navigate(`/category/${item.slug}`); 
  };

  // 🔹 2. STATIC PAGE NAVIGATION (Direct Links)
  const handleStaticNavigation = (path) => {
    setMobileOpen(false);
    setShowCategories(false);
    navigate(path);
  };

  /* Scroll Lock & Outside Click Effects */
  useEffect(() => { document.body.style.overflow = mobileOpen ? "hidden" : "auto"; }, [mobileOpen]);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".category-wrapper")) setShowCategories(false);
    };
    if (showCategories) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategories]);

  return (
    <header className="w-full font-sans">
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
              { name: "Documentation & Support", path: "/support" },
              { name: "Brands", path: "/brands" },
              { name: "Pricing/Quote", path: "/quote" },
              { name: "Contact us", path: "/contact" },
              { name: "About Us", path: "/about" }
            ].map((item) => (
              <a key={item.name} onClick={() => navigate(item.path)} className="hover:underline cursor-pointer">{item.name}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center bg-white rounded-md px-3 py-2 w-56">
            <img src={searchIcon} className="h-4 w-4 mr-2" />
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

        {/* 🔹 MEGA MENU (DESKTOP) */}
        {showCategories && (
          <div className="relative z-40 category-wrapper">
            <MegaMenu 
                arrowRight={arrowRight} 
                data={categoriesData} 
                onNavigate={handleCategoryNavigation} 
            />
          </div>
        )}
      </div>

      {/* 🔹 MOBILE MENU */}
      {mobileOpen && (
        <MobileMenu
          close={() => setMobileOpen(false)}
          
          // State Props
          mobileLevel1={mobileLevel1}
          setMobileLevel1={setMobileLevel1}
          mobileSelectedCategory={mobileSelectedCategory}
          setMobileSelectedCategory={setMobileSelectedCategory}
          mobileSelectedSubCat={mobileSelectedSubCat}
          setMobileSelectedSubCat={setMobileSelectedSubCat}
          
          data={categoriesData}
          
          // Navigation Functions
          onNavigate={handleCategoryNavigation} 
          onStaticNavigate={handleStaticNavigation} 
        />
      )}
    </header>
  );
}

/* ... DropdownButton Component ... */
function DropdownButton({ label, icon, isOpen, onClick, children }) {
    return (
      <div className="relative">
        <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold border transition ${isOpen ? "bg-[#0B4DB8] text-white" : "bg-white text-[#0B4DB8]"}`}>
          <img src={icon} className={`h-4 transition-all ${isOpen ? "invert brightness-0" : ""}`} style={!isOpen ? { filter: "invert(23%) sepia(89%) saturate(2600%) hue-rotate(205deg) brightness(90%) contrast(95%)" } : {}} />
          {label}
           <img src={dropdownIcon} className={`h-3 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180 invert brightness-0" : ""}`} style={!isOpen ? { filter: "invert(23%) sepia(89%) saturate(2600%) hue-rotate(205deg) brightness(90%) contrast(95%)" } : {}} />
        </button>
        {isOpen && children}
      </div>
    );
}

/* ... MegaMenu Component (Desktop) ... */
function MegaMenu({ arrowRight, data, onNavigate }) {
  const [selectedLevel1, setSelectedLevel1] = useState(null);
  const [selectedLevel2, setSelectedLevel2] = useState(null);
  const [selectedLevel3, setSelectedLevel3] = useState(null);

  const handleItemClick = (item, setNextLevel) => {
    if (item.children && item.children.length > 0) {
      setNextLevel(item);
    } else {
      onNavigate(item);
    }
  };

  return (
    <div className="w-full bg-white shadow-xl px-10 py-8 text-sm">
      {/* LEVEL 1 */}
      {!selectedLevel1 && (
        <>
          <h3 className="mb-6 text-lg font-bold text-[#0C4BB2] border-b pb-2">Select a Category</h3>
          <div className="grid grid-cols-4 gap-y-2 gap-x-4">
            {data.map((category) => (
              <div key={category._id} className="flex justify-between items-center cursor-pointer group hover:bg-blue-50 p-1 rounded transition" onClick={() => handleItemClick(category, setSelectedLevel1)}>
                <span className="text-[18px] text-[#0C4BB2] group-hover:text-[#0C4BB2]">{category.name}</span>
                {category.children?.length > 0 && <ChevronRight size={16} className="text-gray-400 group-hover:text-[#0C4BB2]" />}
              </div>
            ))}
          </div>
        </>
      )}

      {/* LEVEL 2 */}
      {selectedLevel1 && !selectedLevel2 && (
        <>
          <div className="flex items-center gap-4 text-[#0C4BB2] mb-6 border-b pb-2">
            <button className="flex items-center gap-2 text-gray-600 text-[18px] hover:text-[#0C4BB2] font-semibold" onClick={() => setSelectedLevel1(null)}>
              <ChevronLeft size={18} /> Back
            </button>
            <h2 className="text-[16px] text-[#0C4BB2] font-bold">{selectedLevel1.name}</h2>
          </div>
          <div className="grid grid-cols-4 gap-12">
            <div className="flex flex-col gap-4">
              {selectedLevel1.children.map((subItem) => (
                <div key={subItem._id} className="flex justify-between items-center cursor-pointer group" onClick={() => handleItemClick(subItem, setSelectedLevel2)}>
                  <span className="text-[18px] text-[#0C4BB2] group-hover:text-[#0C4BB2]">{subItem.name}</span>
                  {subItem.children?.length > 0 && <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0C4BB2]" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* LEVEL 3 */}
      {selectedLevel2 && !selectedLevel3 && (
        <>
          <div className="flex items-center gap-4 text-[#0C4BB2] mb-6 border-b pb-2">
            <button className="flex items-center gap-2 text-gray-600 text-[18px] hover:text-[#0C4BB2] font-semibold" onClick={() => setSelectedLevel2(null)}>
              <ChevronLeft size={18} /> Back 
            </button>
            <h2 className="text-[16px] text-[#0C4BB2] font-bold">{selectedLevel1.name} <span className="mx-2 text-gray-400">/</span> {selectedLevel2.name}</h2>
          </div>
          <div className="grid grid-cols-4 gap-12">
            <div className="flex flex-col gap-4">
              {selectedLevel2.children.map((child) => (
                <div key={child._id} className="flex justify-between items-center cursor-pointer group" onClick={() => handleItemClick(child, setSelectedLevel3)}>
                  <span className="text-[18px] text-[#0C4BB2] group-hover:text-[#0C4BB2]">{child.name}</span>
                  {child.children?.length > 0 && <ChevronRight size={18} className="text-gray-400 group-hover:text-[#0C4BB2]" />}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* LEVEL 4 */}
      {selectedLevel3 && (
        <>
          <div className="flex items-center gap-4 text-[#0C4BB2] mb-6 border-b pb-2">
            <button className="flex items-center gap-2 text-gray-600 text-[18px] hover:text-[#0C4BB2] font-semibold" onClick={() => setSelectedLevel3(null)}>
              <ChevronLeft size={18} /> Back 
            </button>
            <h2 className="text-[16px] text-[#0C4BB2] font-bold">{selectedLevel2.name} <span className="mx-2 text-gray-400">/</span> {selectedLevel3.name}</h2>
          </div>
          {selectedLevel3.children?.length === 0 ? (
            <p className="text-gray-500 italic">No further sub-categories found.</p>
          ) : (
            <div className="grid grid-cols-4 gap-12">
              <div className="flex flex-col gap-4">
                  {selectedLevel3.children.map((deepChild) => (
                <div key={deepChild._id} className="p-1 cursor-pointer text-[18px] text-[#0C4BB2] hover:bg-blue-50 transition" onClick={() => onNavigate(deepChild)}>
                  {deepChild.name}
                </div>
              ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


/* =================================================================
   🔹 MOBILE MENU (CORRECTED & FINALIZED)
   ================================================================= */
function MobileMenu({ close, mobileLevel1, setMobileLevel1, mobileSelectedCategory, setMobileSelectedCategory, mobileSelectedSubCat, setMobileSelectedSubCat, data, onNavigate, onStaticNavigate }) {
    
    // 🔹 Main Menu Items
    const mainMenuItems = [
        { 
            name: "Categories", 
            icon: <Package size={20} />, 
            action: () => setMobileLevel1("Categories"), // Drill down
            hasArrow: true
        },
        { 
            name: "Find Service", 
            icon: <Wrench size={20} />, 
            action: () => onStaticNavigate('/find-service'), 
            hasArrow: true
        },
        { 
            name: "Parts Finder", 
            icon: <Search size={20} />, 
            action: () => onStaticNavigate('/parts-finder'), 
            hasArrow: true
        },
        { 
            name: "Diagrams", 
            icon: <FileText size={20} />, 
            action: () => onStaticNavigate('/diagrams'), 
            hasArrow: true
        },
        { 
            name: "Quick Order", 
            icon: <ListChecks size={20} />, 
            action: () => onStaticNavigate('/quick-order'), 
            hasArrow: false
        }
    ];

    // 🔹 Bottom Links
    const bottomLinks = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Documentation & Support", path: "/support" },
        { name: "Brands", path: "/brands" },
        { name: "Pricing / Quote", path: "/quote" },
        { name: "Contact us", path: "/contact" },
        { name: "About Us", path: "/about" }
    ];

    return (
      <div className="fixed inset-0 z-50 bg-black/40 text-[#0C4BB2] lg:hidden">
        
        {/* Sidebar Container */}
        <div className="w-[85%] max-w-[350px] h-full bg-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-gray-50">
             <h3 className="font-bold text-lg text-gray-800">Menu</h3>
             <button onClick={close} className="p-1 hover:bg-gray-200 rounded-full">
                <X size={24} className="text-gray-600" />
             </button>
          </div>
  
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">

            {/* --- VIEW 1: MAIN MENU LIST --- */}
            {!mobileLevel1 && (
              <div className="flex flex-col">
                 <div className="flex flex-col">
                    {mainMenuItems.map((item, index) => (
                        <div key={index} onClick={item.action} className="flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <span className="text-[#0C4BB2]">{item.icon}</span>
                                <span className="font-bold text-gray-800 text-sm">{item.name}</span>
                            </div>
                            {item.hasArrow && <ChevronRight size={18} className="text-gray-400" />}
                        </div>
                    ))}
                 </div>
                 
                 {/* Bottom Links */}
                 <div className="flex flex-col bg-gray-50 p-4 gap-4 mt-2">
                    {bottomLinks.map((link, index) => (
                        <p 
                            key={index} 
                            className="text-gray-600 font-medium text-sm cursor-pointer hover:text-[#0C4BB2]"
                            onClick={() => onStaticNavigate(link.path)}
                        >
                            {link.name}
                        </p>
                    ))}
                 </div>
              </div>
            )}
            
            {/* --- VIEW 2: CATEGORIES (Level 1) --- */}
            {mobileLevel1 === "Categories" && !mobileSelectedCategory && (
              <div className="p-4">
                <button onClick={() => setMobileLevel1(null)} className="mb-4 flex items-center gap-2 text-gray-500 font-semibold">
                    <ChevronLeft size={20} /> <span>Main Menu</span>
                </button>
                <h3 className="font-bold text-[18px] mb-4 text-[#0C4BB2] border-b pb-2">All Categories</h3>
                {data.map((category) => (
                    <div key={category._id}>
                        <p className="font-medium py-3 border-b flex justify-between items-center cursor-pointer hover:bg-gray-50" onClick={() => setMobileSelectedCategory(category)}>
                           {category.name} <ChevronRight size={16} className="text-gray-400" />
                        </p>
                    </div>
                ))}
              </div>
            )}
    
            {/* --- VIEW 3: SUB-CATEGORIES (Level 2) --- */}
            {mobileSelectedCategory && !mobileSelectedSubCat && (
              <div className="p-4">
                <button onClick={() => setMobileSelectedCategory(null)} className="mb-4 flex items-center gap-2 text-gray-500 font-semibold">
                    <ChevronLeft size={20} /> <span>Back</span>
                </button>
                <h4 className="font-bold mb-4 text-xl text-[#0C4BB2]">{mobileSelectedCategory.name}</h4>
                {mobileSelectedCategory.children.map((subItem) => (
                  <p key={subItem._id} className="flex justify-between items-center py-3 border-b cursor-pointer hover:bg-gray-50"
                    onClick={() => {
                        if(subItem.children && subItem.children.length > 0) {
                            setMobileSelectedSubCat(subItem);
                        } else {
                             onNavigate(subItem); // ✅ Navigates and Closes Menu
                        }
                    }}
                  >
                    <span className="text-sm font-medium">{subItem.name}</span>
                    {subItem.children && subItem.children.length > 0 && <ChevronRight size={16} className="text-gray-400" />}
                  </p>
                ))}
              </div>
            )}
    
            {/* --- VIEW 4: CHILD ITEMS (Level 3) --- */}
            {mobileSelectedSubCat && (
              <div className="p-4">
                <button onClick={() => setMobileSelectedSubCat(null)} className="mb-4 flex items-center gap-2 text-gray-500 font-semibold">
                    <ChevronLeft size={20} /> <span>Back</span>
                </button>
                <h4 className="font-bold mb-2 text-lg text-[#0C4BB2]">{mobileSelectedSubCat.name}</h4>
                {mobileSelectedSubCat.children.length === 0 ? (
                    <p className="text-gray-500 italic py-2">No further items.</p>
                ) : (
                    mobileSelectedSubCat.children.map((child) => (
                        <p 
                            key={child._id} 
                            
                            className="py-3 border-b text-sm font-medium hover:bg-gray-50 cursor-pointer" 
                            onClick={() => onNavigate(child)} // ✅ Navigates and Closes Menu
                        >
                           {child.name}
                        </p>
                    ))
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    );
}