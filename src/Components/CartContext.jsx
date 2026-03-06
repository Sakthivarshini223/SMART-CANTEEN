import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // --- GLOBAL FETCH: Syncs orders for all pages ---
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("CartContext: Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item) => {
    setCart((prev) => [...prev, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, clearCart, fetchOrders }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);