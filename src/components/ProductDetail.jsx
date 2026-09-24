import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail({ favorites, onToggleFavorite }) {
  const { id } = useParams(); // იღებს პარამეტრს URL-იდან
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]); // id როცა შეიცვლება, ხელახლა წამოიღებს

  if (loading) return <h2>იტვირთება...</h2>;
  if (!product) return <h2>პროდუქტი ვერ მოიძებნა</h2>;

  const isFav = favorites.includes(Number(id));

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #eee', padding: '20px' }}>
      <Link to="/">← უკან დაბრუნება</Link>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} style={{ width: '100%' }} />
      <p>{product.description}</p>
      <h3>ფასი: ${product.price}</h3>
      
      <button onClick={() => onToggleFavorite(Number(id))}>
        {isFav ? '❤️ ფავორიტებიდან ამოშლა' : '🤍 ფავორიტებში დამატება'}
      </button>
    </div>
  );
}