// src/App.jsx
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Router hata diya yahan se

// Components
import Header from './components/Header'
import Home from './pages/Home'
import Catalogs from './pages/Catalogs'
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
// import CategoryPage from './pages/CategoryPage'; // Agar banaya hai to uncomment karein

function App() {
  const [showCatalog, setShowCatalog] = useState(false);

  const onCatalogClick = () => {
    setShowCatalog(true);
  };

  useEffect(() => {
    const shouldOpen = sessionStorage.getItem("openCatalog");
    if (shouldOpen === "true") {
      setShowCatalog(true);
      sessionStorage.removeItem("openCatalog");
    }
  }, []);

  return (
    <>
      {/* Ab Header yahan safe hai kyunki main.jsx me 
          humne puri App ko Router me wrap kar diya hai 
      */}
      <Header onCatalogClick={onCatalogClick} />

      <Routes>
          <Route path="/" element={<CategoryPage />} />
          
          {/* Category Page ka Route (Jo pichle step me banaya tha) */}
          {/* <Route path="/category/:slug" element={<CategoryPage />} /> */}
          
          {/* Product Details ko bhi Route bana dena chahiye ideally */}
          <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>

      {/* Catalog Modal */}
      {showCatalog && (
        <Catalogs onClose={() => setShowCatalog(false)} />
      )}

      {/* Note: ProductDetails yahan niche direct render karne se wo har page par dikhega.
          Ise upar Routes ke andar dalna behtar hai. */}
      {/* <ProductDetails /> */} 
    </>
  );
}

export default App;