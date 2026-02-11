import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

// 🔹 IMPORT DATA FROM NEW FILE
import { categoriesData } from "../data/categoriesData"; 

/* 🔹 IMAGES */
import logo from "../assets/images/logo.png";
import catIcon from "../assets/images/icon-categories.png";
import partsIcon from "../assets/images/icon-parts-finder.png";
import catalogueIcon from "../assets/images/icon-catalogue.png";
import brandsIcon from "../assets/images/icon-brands.png";
import dropdownIcon from "../assets/images/icon-dropdown.png";
import arrowRight from "../assets/images/arrow-right.png";
import search from "../assets/images/search.png";

export default function Header({ onCatalogClick }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  // Mobile States
  const [mobileLevel1, setMobileLevel1] = useState(null);
  const [mobileSelectedCategory, setMobileSelectedCategory] = useState(null);
  const [mobileSelectedSubCat, setMobileSelectedSubCat] = useState(null);

  // 🔹 MAIN NAVIGATION FUNCTION
  const handleNavigation = (item) => {
    if (item.children && item.children.length > 0) return;

    setShowCategories(false); 
    setMobileOpen(false);    
    navigate(`/category/${item.slug}`); 
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
           <button className="lg:hidden text-2xl" onClick={() => setMobileOpen(true)}>☰</button>
           <img src={logo} alt="CTP" className="h-12" />
           
           <nav className="hidden lg:flex gap-6 text-sm font-medium">
            {["Home", "Products", "Documentation & Support", "Brands", "Pricing/Quote", "Contact us", "About Us"].map((item) => (
              <a key={item} href="#" className="hover:underline">{item}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center bg-white rounded-md px-3 py-2 w-56">
            <img src={search} className="h-4 w-4 mr-2" />
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
            <DropdownButton label="Parts Finder" icon={partsIcon} />
            <DropdownButton label="Catalogue" icon={catalogueIcon} onClick={onCatalogClick} />
            <DropdownButton label="Brands We Carry" icon={brandsIcon} />
          </div>
        </div>

        {/* 🔹 MEGA MENU - DRILL DOWN STYLE */}
        {showCategories && (
          <div className="relative z-40 category-wrapper">
            <MegaMenu 
                arrowRight={arrowRight} 
                data={categoriesData} 
                onNavigate={handleNavigation} 
            />
          </div>
        )}
      </div>

      {/* 🔹 MOBILE MENU */}
      {mobileOpen && (
        <MobileMenu
          close={() => {
            setMobileOpen(false);
            setMobileLevel1(null);
            setMobileSelectedCategory(null);
            setMobileSelectedSubCat(null);
          }}
          mobileLevel1={mobileLevel1}
          setMobileLevel1={setMobileLevel1}
          mobileSelectedCategory={mobileSelectedCategory}
          setMobileSelectedCategory={setMobileSelectedCategory}
          mobileSelectedSubCat={mobileSelectedSubCat}
          setMobileSelectedSubCat={setMobileSelectedSubCat}
          
          data={categoriesData}
          onNavigate={handleNavigation} 
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

/* =================================================================
   🔹 MEGA MENU (UPDATED: DRILL-DOWN STYLE WITH 4 LEVELS)
   ================================================================= */
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

      {/* ================= LEVEL 1 ================= */}
      {!selectedLevel1 && (
        <>
          <h3 className="mb-6 text-lg font-bold text-[#0C4BB2] border-b pb-2">
            Select a Category
          </h3>

          <div className="grid grid-cols-4 gap-y-2 gap-x-4">
            {data.map((category) => (
              <div
                key={category._id}
                className="flex justify-between items-center cursor-pointer group hover:bg-blue-50 p-1 rounded transition"
                onClick={() => handleItemClick(category, setSelectedLevel1)}
              >
                <span className="text-[18px] text-[#0C4BB2] group-hover:text-[#0C4BB2]">
                  {category.name}
                </span>

                {category.children?.length > 0 && (
                  <ChevronRight
                    size={16}
                    className="text-gray-400 group-hover:text-[#0C4BB2]"
                  />
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= LEVEL 2 ================= */}
      {selectedLevel1 && !selectedLevel2 && (
        <>
          {/* Header */}
          <div className="flex items-center gap-4 text-[#0C4BB2] mb-6  border-b pb-2">
            <button
              className="flex items-center gap-2 text-gray-600 text-[18px] hover:text-[#0C4BB2] font-semibold"
              onClick={() => setSelectedLevel1(null)}
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <h2 className="text-[16px] text-[#0C4BB2] font-bold">
              {selectedLevel1.name}
            </h2>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-4 gap-12">

            {/* Left Side */}
            <div className="flex flex-col gap-4">
              {selectedLevel1.children.map((subItem) => (
                <div
                  key={subItem._id}
                  className="flex justify-between items-center cursor-pointer group"
                  onClick={() => handleItemClick(subItem, setSelectedLevel2)}
                >
                  <span className="text-[18px] text-[#0C4BB2] group-hover:text-[#0C4BB2]">
                    {subItem.name}
                  </span>

                  {subItem.children?.length > 0 && (
                    <ChevronRight
                      size={18}
                      className="text-gray-400 group-hover:text-[#0C4BB2]"
                    />
                  )}
                </div>
              ))}
            </div>
            </div>
          
            

         
 
       
        </>
          )}
     

      {/* ================= LEVEL 3 ================= */}
      {selectedLevel2 && !selectedLevel3 && (
        <>
          <div className="flex items-center gap-4 text-[#0C4BB2] mb-6  border-b pb-2">
            <button
              className="flex items-center gap-2 text-gray-600 text-[18px] hover:text-[#0C4BB2] font-semibold"
              onClick={() => setSelectedLevel2(null)}
            >
              <ChevronLeft size={18} />
              Back 
            </button>

            <h2 className="text-[16px] text-[#0C4BB2] font-bold">
              {selectedLevel1.name}
              <span className="mx-2 text-gray-400">/</span>
              {selectedLevel2.name}
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-12">
            <div className="flex flex-col gap-4">
                {selectedLevel2.children.map((child) => (
              <div
                key={child._id}
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => handleItemClick(child, setSelectedLevel3)}
              >
                <span className="text-[18px] text-[#0C4BB2] group-hover:text-[#0C4BB2]">
                  {child.name}
                </span>

                {child.children?.length > 0 && (
                  <ChevronRight
                    size={18}
                    className="text-gray-400 group-hover:text-[#0C4BB2]"
                  />
                )}
              </div>
            ))}
            </div>
          
          </div>
        </>
      )}

      {/* ================= LEVEL 4 ================= */}
      {selectedLevel3 && (
        <>
          <div className="flex items-center gap-4 text-[#0C4BB2] mb-6  border-b pb-2">
            <button
              className="flex items-center gap-2 text-gray-600 text-[18px] hover:text-[#0C4BB2] font-semibold"
              onClick={() => setSelectedLevel3(null)}
            >
              <ChevronLeft size={18} />
              Back 
            </button>

            <h2 className="text-[16px] text-[#0C4BB2] font-bold">
              {selectedLevel2.name}
              <span className="mx-2 text-gray-400">/</span>
              {selectedLevel3.name}
            </h2>
          </div>

          {selectedLevel3.children?.length === 0 ? (
            <p className="text-gray-500 italic">
              No further sub-categories found.
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-12">
              <div className="flex flex-col gap-4">
                     {selectedLevel3.children.map((deepChild) => (
                <div
                  key={deepChild._id}
                  className=" p-1 cursor-pointer text-[18px] text-[#0C4BB2] hover:bg-blue-50 transition"
                  onClick={() => onNavigate(deepChild)}
                >
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


/* ... MobileMenu (Same as before) ... */
function MobileMenu({ close, mobileLevel1, setMobileLevel1, mobileSelectedCategory, setMobileSelectedCategory, mobileSelectedSubCat, setMobileSelectedSubCat, data, onNavigate }) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 text-[#0C4BB2]">
        <div className="w-[85%] h-full bg-white p-4 overflow-y-auto">
          <div className="flex justify-between mb-4"><h3 className="font-bold text-lg">Menu</h3><button onClick={close}>✕</button></div>
  
          {!mobileLevel1 && (
              <p className="py-3 border-b font-semibold flex justify-between" onClick={() => setMobileLevel1("Categories")}>Categories <ChevronRight /></p>
          )}
          
          {mobileLevel1 === "Categories" && !mobileSelectedCategory && (
            <>
              <button onClick={() => setMobileLevel1(null)}><div className="flex items-center gap-2 mb-4"><ChevronLeft /><span>Back</span></div></button>
              {data.map((category) => (
                  <div key={category._id}>
                      <p className="font-bold mt-4 border-b pb-2 flex justify-between" onClick={() => setMobileSelectedCategory(category)}>
                         {category.name} <ChevronRight />
                      </p>
                  </div>
              ))}
            </>
          )}
  
          {mobileSelectedCategory && !mobileSelectedSubCat && (
            <>
              <button onClick={() => setMobileSelectedCategory(null)}><div className="flex items-center gap-2 mb-4"><ChevronLeft /><span>Back</span></div></button>
              <h4 className="font-bold mb-4 text-xl">{mobileSelectedCategory.name}</h4>
              {mobileSelectedCategory.children.map((subItem) => (
                <p
                  key={subItem._id}
                  className="flex justify-between py-3 border-b"
                  onClick={() => {
                      if(subItem.children && subItem.children.length > 0) {
                          setMobileSelectedSubCat(subItem);
                      } else {
                          onNavigate(subItem);
                      }
                  }}
                >
                  {subItem.name}
                  {subItem.children && subItem.children.length > 0 && <ChevronRight />}
                </p>
              ))}
            </>
          )}
  
          {mobileSelectedSubCat && (
            <>
              <button onClick={() => setMobileSelectedSubCat(null)}><div className="flex items-center gap-2 mb-4"><ChevronLeft /><span>Back</span></div></button>
              <h4 className="font-bold mb-2 text-lg">{mobileSelectedSubCat.name}</h4>
              {mobileSelectedSubCat.children.map((child) => (
                <p key={child._id} className="py-2 border-b text-sm" onClick={() => onNavigate(child)}>
                  {child.name}
                </p>
              ))}
            </>
          )}
        </div>
      </div>
    );
}