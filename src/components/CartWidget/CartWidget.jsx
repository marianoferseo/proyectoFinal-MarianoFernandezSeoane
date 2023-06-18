import { useContext } from 'react'
import '../CartWidget/CartWidget.css'
import cart from '../../assets/cart.jfif'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'

const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext)
    
  return (
    <div className='carrito'>
    <Link to='/cart' className='CartWidget' style={{ display: totalQuantity > 0 ? 'block' : 'none'}}>
      <img className='CartImg' src={cart} alt="cart-widget" />
      {totalQuantity}
    </Link>
    </div>
  )
}

export default CartWidget
