import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';
import './checkout.css';
import Cart from '../Cart/Cart';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    confirmEmail: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [ordenId, setOrdenId] = useState('');
  const [total, setTotal] = useState();

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };


  const calculateTotal = () => {
    const totalPrice = cart.reduce((acc, item) => {
      const itemPrice = item.item && item.item.price ? parseFloat(item.item.price) : 0;
      return acc + itemPrice * item.quantity;
    }, 0);
    setTotal(totalPrice);
  };
  
  
  

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const orderData = {
      name: formData.name,
      lastName: formData.lastName,
      phone: formData.phone,
      email: formData.email,
      cartItems: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        item: item
      }))
    };

    const orden = {
      items: orderData.cartItems.map(prod => ({
        id: prod.id,
        nombre: prod.name,
        cantidad: prod.quantity,
      })),
      total: {total},
      nombre: orderData.name,
      apellido: orderData.lastName,
      telefono: orderData.phone,
      email: orderData.email,
    };

    addDoc(collection(db, 'ordenes'), orden)
      .then(docRef => {
        setOrdenId(docRef.id);
        clearCart();
      })
      .catch(error => {
        console.error('Error al crear la orden.', error);
        setErrorMessage('Se produjo un error al crear la orden, intente nuevamente');
      });
  };

  const validateForm = () => {
    if (
      formData.name.trim() === '' ||
      formData.lastName.trim() === '' ||
      formData.phone.trim() === '' ||
      formData.email.trim() === '' ||
      formData.confirmEmail.trim() === ''
    ) {
      setErrorMessage('Por favor complete todos los campos');
      return false;
    }

    if (formData.email !== formData.confirmEmail) {
      setErrorMessage('Los email ingresados no coinciden');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  return (
    <div className="container">
      <h1>Checkout</h1>

      <h2>Resumen de la compra:</h2>
{cart.length === 0 ? (
  <p>No hay items en el carrito</p>
) : (
  <ul>
    {cart.map(item => (
      <li key={item.id}>
        {item.name} - Cantidad: {item.quantity} - Subtotal: ${item.quantity * item.price}
      </li>
    ))}
  </ul>
)}


      <h2>Información del comprador:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="confirmEmail">Confirmar Email:</label>
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={formData.confirmEmail}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Realizar Compra</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}

      {ordenId && <p>Orden completada con éxito. ID de la orden: {ordenId}</p>}

      <p>
        Volver al <Link to="/">inicio</Link>.
      </p>
      
      {cart.length > 0 && (
        <div className="total-container">
          <h2>Total de la compra: {total}</h2>
        </div>
      )}
    </div>
  );
};

export default Checkout;
