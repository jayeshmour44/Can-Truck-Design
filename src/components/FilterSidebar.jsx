export default function FilterSidebar() {
  const brands = [
    "OEM","ZF","WABCO","DISTRIBUTOR","CSA ASC","DOT","ERITC",
    "Gunite","Grote","Haldex","Bendix","Neway","Ridewell",
    "Fontaine","JOST","BettsHD",
  ];

  return (
    <div className="
      w-full lg:w-64
      bg-white
      rounded-lg
      p-4
      text-sm
      shadow-md
    ">
      <h3 className="font-semibold text-[#0B4DB8] mb-3">
        Price Range
      </h3>

      <p className="text-xs text-[#0B4DB8] mb-1">Price</p>
      <input type="range" className="w-full mb-2" />

      <div className="flex justify-between text-xs mb-4 text-[#0B4DB8]">
        <span>CAD $0</span>
        <span>CAD $500</span>
      </div>

      <p className="font-semibold text-[#0B4DB8] mb-2">
        Brand
      </p>

      <input
        type="text"
        placeholder="Search..."
        className="border rounded w-full px-2 py-1 text-xs mb-3"
      />

      <div className="space-y-2 text-xs ">
        {brands.map((brand) => (
          <label
            key={brand}
            className="flex items-center justify-between cursor-pointer text-[#0061FF] font-bold"
          >
            <span>{brand}</span>
            <input type="checkbox" />
          </label>
        ))}
      </div>
    </div>
  );
}
