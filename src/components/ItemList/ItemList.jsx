import './ItemList.css';
import Item from '../Item/Item';

const ItemList = ({ products }) => {

  if (!Array.isArray(products)) {
    return console.log('no es array valido'); 
  }


  return (
    <div className='ListGroup'>
      {products.map(prod => (
        <Item key={prod.id} {...prod} />
      ))}
    </div>
  );
};

export default ItemList;