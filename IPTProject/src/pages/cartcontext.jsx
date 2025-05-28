import React, { useState, createContext, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (!savedUser) return [];
      const user = JSON.parse(savedUser);
      const savedCart = localStorage.getItem(`gameCart_${user.username}`);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`gameCart_${currentUser.username}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  // Add item or increase quantity
  const addToCart = (game) => {
    if (!currentUser) {
      alert("Please log in to add items to your cart");
      return false;
    }
    const idx = cartItems.findIndex(item => item.title === game.title);
    if (idx === -1) {
      setCartItems([...cartItems, { ...game, quantity: 1 }]);
    } else {
      const updated = [...cartItems];
      updated[idx].quantity += 1;
      setCartItems(updated);
    }
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const increaseQuantity = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
  };

  const decreaseQuantity = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
    } else {
      // Remove item if quantity goes to 0
      removeFromCart(index);
    }
  };

  const clearCart = () => {
    setCartItems([]);
    if (currentUser) {
      localStorage.setItem(`gameCart_${currentUser.username}`, JSON.stringify([]));
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const openCartSidebar = () => setIsCartOpen(true);

  // Calculate total price (handles ₱ and $)
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
      total += price * (item.quantity || 1);
    });
    const hasPeso = cartItems.some((item) => item.price.includes("₱"));
    const hasDollar = cartItems.some((item) => item.price.includes("$"));
    if (hasPeso && !hasDollar) {
      return `₱${total.toFixed(2)}`;
    } else if (hasDollar && !hasPeso) {
      return `$${total.toFixed(2)}`;
    } else {
      return `₱${total.toFixed(2)}`;
    }
  };

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    const savedCart = localStorage.getItem(`gameCart_${user.username}`);
    setCartItems(savedCart ? JSON.parse(savedCart) : []);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCartItems([]);
  };

  const value = {
    cartItems,
    isCartOpen,
    currentUser,
    addToCart,
    removeFromCart,
    clearCart,
    toggleCart,
    openCartSidebar,
    calculateTotal,
    login,
    logout,
    increaseQuantity,
    decreaseQuantity
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;