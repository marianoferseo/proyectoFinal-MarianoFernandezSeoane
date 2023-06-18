import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [],
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  console.log(cart)

  const addItem = (item, quantity) => {
    if (!isInCart(item.id)) {
      setCart(prev => [...prev, { ...item, quantity }]);
    } else {
      console.error('El producto ya fue agregado');
    }
  };

  const removeItem = (itemId) => {
    const cartUpdated = cart.filter(prod => prod.id !== itemId);
    setCart(cartUpdated);
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (itemId) => {
    return cart.some(prod => prod.id === itemId);
  };

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    cart.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      clearCart,
      totalQuantity: calculateTotalQuantity(),
      total: calculateTotal(),
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext