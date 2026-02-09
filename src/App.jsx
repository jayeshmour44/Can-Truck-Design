import { useEffect, useState } from 'react';
import Header from './components/Header'
import Catalogs from './pages/Catalogs'
import ProductDetails from './pages/ProductDetails';
// import CategoryPage from './pages/CategoryPage'

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
      <Header onCatalogClick={onCatalogClick} />

      {showCatalog && (
        <Catalogs onClose={() => setShowCatalog(false)} />
      )}
      <ProductDetails />
      {/* <CategoryPage /> */}

    </>
  );
}


export default App
