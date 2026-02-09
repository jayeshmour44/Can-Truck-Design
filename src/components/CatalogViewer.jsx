import { useState } from "react";

export default function CatalogViewer({ catalog, onClose }) {
  const [page, setPage] = useState(0);
  const [doublePage, setDoublePage] = useState(false);

  const next = () => {
    if (page < catalog.pages.length - 1) {
      setPage(page + (doublePage ? 2 : 1));
    }
  };

  const prev = () => {
    if (page > 0) {
      setPage(page - (doublePage ? 2 : 1));
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-whiteflex flex-col">

      {/* 🔹 TOP BAR */}
      <div className="bg-blue-700 text-white px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 sticky top-0 z-10">
        <button onClick={() => setDoublePage(!doublePage)}>
          {doublePage ? "Single Page" : "Double Page"}
        </button>

        <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
          Copy Link
        </button>

        <button>Export PDF</button>

        <button
          onClick={onClose}
          className="ml-auto text-xl"
        >
          ✕
        </button>
      </div>

      {/* 🔹 VIEWER */}
      <div className="flex-1 flex items-center justify-center gap-3 sm:gap-6 px-4 py-8">

        <button onClick={prev} className="text-3xl sm:text-4xl text-black">
          ❮
        </button>

        <div className="flex gap-2">
          <img
            src={catalog.pages[page]}
            className="h-[60vh] sm:h-[80vh] shadow-xl"
          />

          {doublePage && catalog.pages[page + 1] && (
            <img
              src={catalog.pages[page + 1]}
              className="h-[60vh] sm:h-[80vh] shadow-xl hidden sm:block"
            />
          )}
        </div>

        <button onClick={next} className="text-3xl sm:text-4xl text-black">
          ❯
        </button>
      </div>

      {/* 🔹 THUMBNAILS */}
      {/* <div className="bg-white p-2 flex gap-2 overflow-x-auto">
        {catalog.pages.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setPage(i)}
            className={`h-20 cursor-pointer border-2 ${
              page === i ? "border-blue-600" : "border-transparent"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
