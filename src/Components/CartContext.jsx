import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() + Math.random() }]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const confirmOrder = (orderDetails) => {
    const newOrder = {
      orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      total: orderDetails.total,
      time: orderDetails.pickupTime,
      status: "Preparing",
      timestamp: new Date().toLocaleTimeString(),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); 
  };

  return (
    <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, confirmOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);