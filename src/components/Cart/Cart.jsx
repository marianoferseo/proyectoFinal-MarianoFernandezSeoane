import React from 'react';
import './Cart.css';
import { useContext } from 'react';
import CartItem from '../CartItem/CartItem';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, totalQuantity, total, removeItem } = useContext(CartContext);

  if (totalQuantity === 0) {
    return (
      <div>
        <h1>No hay items en el carrito</h1>
        <Link to='/' className='Option'>Productos</Link>
      </div>
    );
  }

  const handleRemoveItem = (itemId) => {
    removeItem(itemId);
  };

  return (
    <div>
      {cart.map(p => (
        <CartItem
          key={p.id}
          id={p.id}
          name={p.name}
          price={p.price}
          quantity={p.quantity}
          onDelete={handleRemoveItem}
        />
      ))}
      <h3>Total: ${total}</h3>
      <button onClick={() => clearCart()} className='Option'>Limpiar Carrito</button>
      <Link to='/checkout' className='Option'>Checkout</Link>
    </div>
  );
}

export default Cart;
