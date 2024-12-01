import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import './productList.css';
import Cart from './Cart';
import { FaShoppingCart } from 'react-icons/fa'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedQuantity = existingProduct.quantity + 1;
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: updatedQuantity } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="product-list">
      <div className="header">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <div className="cart-icon-container" onClick={() => setShowCart(!showCart)}>
          <FaShoppingCart className="cart-icon" />
          {totalItemsInCart > 0 && <span className="cart-badge">{totalItemsInCart}</span>}
        </div>
      </div>

      {showCart && <Cart cart={cart} setCart={setCart} closeCart={() => setShowCart(false)} />}

      <h2>Products</h2>
      {error && <p className="error">{error}</p>}
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
