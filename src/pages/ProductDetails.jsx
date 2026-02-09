import { useState } from "react";

/* 🔹 IMAGES (Figma Exported) */
import img1 from "../assets/images/product-main.png";
import img2 from "../assets/images/thumb-1.png";
import img3 from "../assets/images/thumb-2.png";
import img4 from "../assets/images/thumb-3.png";
import img5 from "../assets/images/thumb-4.png";

const productImages = [img1, img2, img3, img4, img5];

export default function ProductDetails() {
  const [activeImage, setActiveImage] = useState(productImages[0]);

  return (
    <>
    <div className="bg-[#eef5ff] py-0 px-4 md:px-12">
      <h1 className="text-2xl font-bold text-[#0C4BB2]">Air System</h1>
      <p className="text-sm text-[#0C4BB2] font-bold">
        Heavy Duty Air System For Truck & Trailer
      </p>
      {/* 🔹 TOP SECTION */}
      <div className="max-w-7xl mx-auto mt-[62px] pb-15 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT – Images */}
<div className="flex flex-col lg:flex-row gap-4 order-1 lg:order-none">

  {/* Thumbnails */}
  <div className="flex flex-row lg:flex-col gap-3 
                  overflow-x-auto lg:overflow-visible">
    {productImages.map((img, index) => (
      <button
        key={index}
        onClick={() => setActiveImage(img)}
        className={`border rounded-md p-2 border-3 flex-shrink-0
          ${activeImage === img ? "border-blue-600" : "border-blue-300"}
        `}
      >
        <img
          src={img}
          alt={`thumb-${index}`}
          className="w-16 h-16 object-contain"
        />
      </button>
    ))}
  </div>

  {/* Main Image */}
  <div className="flex-1  border border-blue-300 rounded-lg 
                  flex items-center justify-center p-6">
    <img
      src={activeImage}
      alt="Product"
      className="max-h-[420px] w-full object-contain"
    />
  </div>

</div>


        {/* RIGHT – Product Info */}
        <div className="space-y-4">
          <div className="space-y-2 text-base">
            <p>
              <span className="font-bold text-[#000000]">Price -</span>
              <span className="text-[#0C4BB2] font-bold">CAD $599.99</span>
            </p>
            <p>
              <span className="font-bold text-[#000000]">Part# -</span>
              <span className="text-[#0C4BB2] font-bold"> CT-AIR-SYS-01</span>
            </p>
            <p>
              <span className="font-bold text-[#000000]">Brand -</span>
              <span className="text-[#0C4BB2] font-bold"> OTR</span>
            </p>
            <p>
              <span className="font-bold text-[#000000]">User Manual -</span>
              <a href="#" className="text-[#0C4BB2] font-bold">
                Air Compressor: /products/ air-compressor
              </a>
            </p>
          </div>

          <button className="mt-4 bg-blue-700 text-white px-20 py-3 font-bold hover:bg-blue-800">
            Contact Us
          </button>
        </div>
      </div>

      {/* 🔹 DESCRIPTION */}
      
    </div>
    <div className="max-w-7xl mx-auto mt-7 bg-white p-6 ">
        <h2 className="text-lg text-[#000000] font-bold mb-2">Description</h2>
        <p className="text-sm text-[#133374] font-[22px] font-bold leading-relaxed">
          The Air System plays a vital role in the safe operation of trucks and
          trailers by generating, storing, and regulating compressed air. This
          compressed air is mainly used to operate the air brake system and
          other pneumatic components of the vehicle. The system works by drawing
          air through the air compressor, drying and filtering it using an air
          dryer, and then distributing it through valves and hoses to control
          braking and suspension functions.
        </p>
      </div>
    </>
  );
}
