export default function ProductCard({ product }) {
  return (
    <div className="
      bg-white
      rounded-xl
      shadow-md
      px-4 sm:px-5
      py-5 sm:py-6
      text-center
      h-full
      flex flex-col
    ">
      {/* TITLE */}
      <h4 className="text-sm font-semibold text-[#0B4DB8]">
        {product.title}
      </h4>

      {/* IMAGE BOX */}
      <div className="
        h-32 sm:h-36 lg:h-40
        bg-[#EFF4FF]
        mb-4
        flex items-center justify-center
        rounded-lg
      ">
        <img
          src={product.img}
          alt={product.title}
          className="h-24 sm:h-26 lg:h-28 object-contain"
        />
      </div>

      <p className="text-s text-[#0C4BB2] mt-5 mb-4 font-bold">
        Part #OTRTC1001 | Brand: OTR
      </p>

      {/* PRICE */}
      <div className="mt-auto pt-6 sm:pt-8 mb-2 -mx-4 sm:-mx-5 border-t border-[#0C4BB2]">
        <p className="text-sm font-semibold text-[#0B4DB8]">
          {product.price} / ea
        </p>
      </div>
    </div>
  );
}
