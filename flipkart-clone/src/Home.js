import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';  // Import the CSS file

const Home = ({ userId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('http://localhost:5000/api/products');
    setProducts(response.data);
  };

  const addToCart = async (productId) => {
    await axios.post('http://localhost:5000/api/cart', { userId, productId });
    alert('Product added to cart');
  };

  return (
    <div className="home-container">
      <h1>Flipkart Clone</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home; 