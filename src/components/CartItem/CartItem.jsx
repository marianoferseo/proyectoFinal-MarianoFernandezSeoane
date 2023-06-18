import React from 'react';

const CartItem = ({ id, name, price, quantity, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="CartItem">
      <p>{name}</p>
      <p>{quantity}</p>
      <p>${price}</p>
      <p>Total: ${price * quantity}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default CartItem;
