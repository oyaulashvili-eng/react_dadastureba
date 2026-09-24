import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';

export default function App() {
  // ფავორიტი ID-ების მასივი localStorage-ში
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  // ID-ის დამატება / ამოშლა
  const handleToggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favId) => favId !== id); // ამოშლა
      } else {
        return [...prevFavorites, id]; // დამატება
      }
    });
  };

  return (
    <BrowserRouter>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <header style={{ marginBottom: '20px' }}>
          <h1>🛍️ ჩემი მაღაზია</h1>
          <nav>
            <Link to="/" style={{ marginRight: '15px' }}>მთავარი გვერდი</Link>
            <span>❤️ ფავორიტები: {favorites.length}</span>
          </nav>
        </header>

        {/* როუტინგი */}
        <Routes>
          <Route 
            path="/" 
            element={
              <ProductList 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite} 
              />
            } 
          />
          <Route 
            path="/products/:id" 
            element={
              <ProductDetail 
                favorites={favorites} 
                onToggleFavorite={handleToggleFavorite} 
              />
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}