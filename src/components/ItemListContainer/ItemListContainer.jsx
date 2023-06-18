import './ItemListContainer.css';
import { useState, useEffect } from 'react';
//import { getProducts, getProductsByCategory } from '../../../asyncMock';
import ItemList from '../ItemList/ItemList';

import { useParams } from 'react-router-dom';

import{collection, getDocs, where, query} from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';



const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);

  const { categoryId } = useParams();


  useEffect(() => {
    // Corregir el uso de query
    const collectionRef = collection(db, 'products');
    const queryRef = categoryId ? query(collectionRef, where('category', '==', categoryId)) : collectionRef;

    getDocs(queryRef)
      .then((respuesta) => {
        const nuevosProductos = respuesta.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProducts(nuevosProductos);
      })
      .catch((error) => console.log(error));
  }, [categoryId]);

/*
  useEffect(() =>{
    
    const asyncFunc = categoryId ? getProductsByCategory : getProducts
    

    
      asyncFunc(categoryId)
        .then(response => {
          setProducts(response)
        })
        .catch(error => {
          console.error(error)
        })
    }, [categoryId])
*/


  return (
    <div>
      <h1 className='bienvenida'>{greeting}</h1>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;