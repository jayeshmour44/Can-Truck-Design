export default function CatalogCard({ catalog, onOpen }) {
  return (
    <div
      onClick={() => onOpen(catalog)}
      className="cursor-pointer text-center"
    >
      <img
        src={catalog.img}
        className="mx-auto h-[380px] sm:h-[420px] shadow-lg hover:scale-105 transition"
      />
      <p className="mt-4 text-base sm:text-lg">
        {catalog.title}
      </p>
    </div>
  );
}
