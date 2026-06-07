import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      // Temporarily change to this for testing
const response = await fetch('http://localhost:5000/api/orders');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.warn("CartContext: Fetch failed, check backend server status.");
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item) => setCart((prev) => [...prev, { ...item, cartId: Date.now() }]);
  const removeFromCart = (cartId) => setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, clearCart, fetchOrders }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);