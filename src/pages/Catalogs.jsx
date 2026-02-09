import { useState } from "react";
import { catalogs } from "../data/catalogs";
import CatalogCard from "../components/CatalogCard";
import CatalogViewer from "../components/CatalogViewer";

export default function Catalogs() {
  const [activeCatalog, setActiveCatalog] = useState(null);

  return (
    <>
      {/* 🔹 LISTING (sirf tab dikhe jab viewer open NA ho) */}
      {!activeCatalog && (
        <div className="max-w-xl mx-auto  py-20 grid grid-cols-1 sm:grid-cols-2">
          {catalogs.map((cat) => (
            <CatalogCard
              key={cat.id}
              catalog={cat}
              onOpen={setActiveCatalog}
            />
          ))}
        </div>
      )}

      {/* 🔹 VIEWER (inline page, popup nahi) */}
      {activeCatalog && (
        <CatalogViewer
          catalog={activeCatalog}
          onClose={() => setActiveCatalog(null)}
        />
      )}
    </>
  );
}
