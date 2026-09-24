import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductList({ favorites, onToggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API-დან მონაცემების წამოღება (DummyJSON API)
    fetch('https://dummyjson.com/products?limit=8')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []); // [] უზრუნველყოფს, რომ მოთხოვნა გაიგზავნოს მხოლოდ ერთხელ

  if (loading) return <h2>იტვირთება...</h2>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {products.map((product) => {
        const isFav = favorites.includes(product.id);
        return (
          <div 
            key={product.id} 
            style={{ border: '1fr solid #ccc', border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}
          >
            <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            
            <button onClick={() => onToggleFavorite(product.id)}>
              {isFav ? '❤️ ფავორიტებიდან ამოშლა' : '🤍 ფავორიტებში დამატება'}
            </button>
            <br /><br />
            
            {/* დინამიური ლინკი /products/:id */}
            <Link to={`/products/${product.id}`}>დეტალურად ნახვა</Link>
          </div>
        );
      })}
    </div>
  );
}