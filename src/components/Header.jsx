import { useState, useEffect } from "react";

/* 🔹 FIGMA IMAGES */
import logo from "../assets/images/logo.png";
import catIcon from "../assets/images/icon-categories.png";
import partsIcon from "../assets/images/icon-parts-finder.png";
import catalogueIcon from "../assets/images/icon-catalogue.png";
import brandsIcon from "../assets/images/icon-brands.png";
import dropdownIcon from "../assets/images/icon-dropdown.png";
import arrowRight from "../assets/images/arrow-right.png";
import search from "../assets/images/search.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* 🔹 SUB DROPDOWN DATA (3rd LEVEL) */
const subDropdownData = {
  "Air Brake Valves": [
    "Relay Valves",
    "Foot Brake Valves",
    "Quick Release Valves",
    "Hand Control Valves",
  ],
  "Air Hoses & Tubes": [
    "Nylon Tubes",
    "Rubber Air Hoses",
    "Coiled Air Hoses",
  ],
  "LED Tail Lights": [
    "Round LED Lights",
    "Square LED Lights",
    "Waterproof LED Lights",
  ],
  "Brake Chamber": [
    "Spring Brake Chambers",
    "Service Chambers",
    "Combo Chambers",
  ],
  "Leaf Springs": ["Multi Leaf Springs", "Parabolic Springs"],
  "Axles": ["Trailer Axles", "Steering Axles", "Lift Axles"],
};

/* 🔹 SAME DATA FOR DESKTOP + MOBILE */
const categoriesData = [
  {
    title: "Air System",
    items: [
      "Air Brake Valves",
      "Air Hoses & Tubes",
      "Air Tanks",
      "Glad Hands",
      "Pressure Protection Valves",
    ],
  },
  {
    title: "Lighting & Electrical",
    items: [
      "LED Tail Lights",
      "Marker Lights",
      "Turn Signal Lights",
      "Wiring Harness",
      "Reflectors",
    ],
  },
  {
    title: "Brake System",
    items: [
      "Brake Chamber",
      "Brake Shoes",
      "Brake Drums",
      "Slack Adjuster",
      "ABS Sensors",
    ],
  },
  {
    title: "Suspension Parts",
    items: [
      "Leaf Springs",
      "Air Bags",
      "Shock Absorbers",
      "Torque Rods",
      "Suspension Bushes",
    ],
  },
  {
    title: "Axle & Wheel Parts",
    items: [
      "Axles",
      "Wheel Hub",
      "Bearings",
      "Hub Caps",
      "Studs & Nuts",
    ],
  },
];


export default function Header({ onCatalogClick }) {
  // const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLevel1, setMobileLevel1] = useState(null);
  const [mobileLevel2, setMobileLevel2] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  /* 🔹 BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".category-wrapper")) {
      setShowCategories(false);
    }
  };

  if (showCategories) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showCategories]);


  return (
    <header className="w-full font-sans">
      {/* 🔹 TOP BAR */}
      <div className="bg-[#0C4BB2] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* HAMBURGER */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileOpen(true)}
          >
            ☰
          </button>

          <img src={logo} alt="CTP" className="h-12" />

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex gap-6 text-sm font-medium">
            {[
              "Home",
              "Products",
              "Documentation & Support",
              "Brands",
              "Pricing/Quote",
              "Contact us",
              "About Us",
            ].map((item) => (
              <a key={item} href="#" className="hover:underline">
                {item}
              </a>
            ))}
          </nav>

          {/* SEARCH (DESKTOP ONLY) */}
          <div className="hidden md:flex items-center bg-white rounded-md px-3 py-2 w-56">
            <img src={search} className="h-4 w-4 mr-2" />
            <input
              className="outline-none text-sm text-black w-full"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      {/* 🔹 BUTTON BAR (DESKTOP ONLY) */}
      <div className="relative category-wrapper">
      <div className="bg-[#0B4DB8] py-3 hidden lg:block">
        <div className="max-w-7xl mx-auto flex gap-4 px-6">
          <DropdownButton
  label="Categories"
  icon={catIcon}
  isOpen={showCategories}
  onClick={(e) => {
    e.stopPropagation(); 
    setShowCategories(prev => !prev);
  }}
/>

          <DropdownButton label="Parts Finder" icon={partsIcon} />
          <DropdownButton label="Catalogue" icon={catalogueIcon} onClick={onCatalogClick} />
          <DropdownButton label="Brands We Carry" icon={brandsIcon} />
        </div>
      </div>

      {showCategories && (
  <div className="relative z-40 category-wrapper">
    <MegaMenu arrowRight={arrowRight} closeMenu={() => setShowCategories(false)} />

  </div>
)}
</div>

      {/* 🔹 MOBILE MENU */}
      {mobileOpen && (
        <MobileMenu
          close={() => {
            setMobileOpen(false);
            setMobileLevel1(null);
            setMobileLevel2(null);
          }}
          mobileLevel1={mobileLevel1}
          setMobileLevel1={setMobileLevel1}
          mobileLevel2={mobileLevel2}
          setMobileLevel2={setMobileLevel2}
          onCatalogClick={onCatalogClick}
        />
      )}
    </header>
  );
}

/* 🔹 DROPDOWN BUTTON */
function DropdownButton({ label, icon, isOpen, onEnter, onLeave, children, onClick }) {
  return (
    <div className="relative">
      <button
  onClick={onClick}
  className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold border transition
    ${isOpen ? "bg-[#0B4DB8] text-white" : "bg-white text-[#0B4DB8]"}
  `}
>

        {/* LEFT ICON */}
        <img
          src={icon}
          className={`h-4 transition-all
            ${
              isOpen
                ? "invert brightness-0"     // WHITE when open
                : ""
            }
          `}
          style={
            !isOpen
              ? {
                  filter:
                    "invert(23%) sepia(89%) saturate(2600%) hue-rotate(205deg) brightness(90%) contrast(95%)",
                }
              : {}
          }
        />

        {label}

        {/* DROPDOWN ARROW */}
        <img
          src={dropdownIcon}
          className={`h-3 ml-1 transition-transform duration-200
            ${
              isOpen
                ? "rotate-180 invert brightness-0" // WHITE when open
                : ""
            }
          `}
          style={
            !isOpen
              ? {
                  filter:
                    "invert(23%) sepia(89%) saturate(2600%) hue-rotate(205deg) brightness(90%) contrast(95%)",
                }
              : {}
          }
        />
      </button>

      {isOpen && children}
    </div>
  );
}


/* 🔹 DESKTOP MEGA MENU */
function MegaMenu({ arrowRight, closeMenu }) {
const [selectedItem, setSelectedItem] = useState(null); // for 2nd level


  return (
    <div className="w-full bg-white shadow-xl px-10 py-8 text-[#0C4BB2] font-semibold">
      {!selectedItem && (
  <div className="grid grid-cols-5 gap-10 text-sm">
    {categoriesData.map((group) => (
      <div key={group.title}>
        <h4 className="font-bold mb-3">{group.title}</h4>

        {group.items.map((item) => (
          <p
            key={item}
            className="flex justify-between py-1 cursor-pointer hover:underline"
            onClick={() =>
              subDropdownData[item] && setSelectedItem(item)
            }
          >
            {item}
            {subDropdownData[item] && (
              <img src={arrowRight} className="h-3" />
            )}
          </p>
        ))}
      </div>
    ))}
  </div>
)}

{selectedItem && (
  <>
    <button
      className="mb-4 flex items-center gap-2 font-semibold"
      onClick={() => setSelectedItem(null)}
    >
      ← Back
    </button>

    <h3 className="font-bold mb-4">{selectedItem}</h3>

    <div className="grid grid-cols-3 gap-3 text-sm">
      {subDropdownData[selectedItem].map((sub) => (
        <p key={sub} className="cursor-pointer hover:underline">
          {sub}
        </p>
      ))}
    </div>
  </>
)}
     </div>
  );
}

/* 🔹 MOBILE SLIDE MENU */
function MobileMenu({
  close,
  mobileLevel1,
  setMobileLevel1,
  mobileLevel2,
  setMobileLevel2, 
  onCatalogClick 
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 text-[#0C4BB2]">
      <div className="w-[85%] h-full bg-white p-4 overflow-y-auto">
        <div className="flex justify-between mb-4">
          <h3 className="font-bold text-lg">Menu</h3>
          <button onClick={close}>✕</button>
        </div>

        {/* LEVEL 1 */}
        {!mobileLevel1 && (
  <>
    {/* PRIMARY MENU */}
    <p
      className="py-3 border-b font-semibold flex justify-between"
      onClick={() => setMobileLevel1("Categories")}
    >
      Categories <ChevronRight />
    </p>

    <p className="py-3 border-b">Parts Finder</p>
    <p
  className="py-3 border-b"
  onClick={() => {
    close();
    onCatalogClick();
  }}
>
  Catalogue
</p>

    <p className="py-3 border-b">Brands</p>

    {/* DIVIDER */}
    <div className="my-4 " />

    {/* PAGE NAV LINKS */}
    <nav className="flex flex-col gap-3 text-sm font-medium">
      {[
        "Home",
        "Products",
        "Documentation & Support",
        "Brands",
        "Pricing/Quote",
        "Contact us",
        "About Us",
      ].map((item) => (
        <a
          key={item}
          href="#"
          className="py-2  hover:underline"
        >
          {item}
        </a>
      ))}
    </nav>
  </>
)}
        {/* LEVEL 2 */}
        {mobileLevel1 === "Categories" && !mobileLevel2 && (
          <>
            <button onClick={() => setMobileLevel1(null)}>
              <div className="flex items-center gap-2">
  <ChevronLeft />
  <span>Back</span>
</div>

            </button>

            {categoriesData.map((group) => (
              <div key={group.title}>
                <p className="font-bold mt-4">{group.title}</p>
                {group.items.map((item) => (
                  <p
                    key={item}
                    className="flex justify-between py-2 border-b"
                    onClick={() =>
                      subDropdownData[item] && setMobileLevel2(item)
                    }
                  >
                    {item}
                    {subDropdownData[item] && <ChevronRight />}
                  </p>
                ))}
              </div>
            ))}
          </>
        )}

        {/* LEVEL 3 */}
        {mobileLevel2 && (
          <>
            <button onClick={() => setMobileLevel2(null)}>
              <div className="flex items-center gap-2">
  <ChevronLeft />
  <span>Back</span>
</div>

            </button>
            {subDropdownData[mobileLevel2].map((sub) => (
              <p key={sub} className="py-2 border-b text-sm">
                {sub}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
