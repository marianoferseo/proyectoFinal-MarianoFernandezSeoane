import '../ItemDetailContainer/ItemDetailContainer.css'
import { useState, useEffect } from 'react'
//import {getProductById} from '../../../asyncMock'
import ItemDetail from '../ItemDetail/ItemDetail'
import { useParams } from 'react-router-dom'

import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const ItemDetailContainer = () => {

    const [product, setProduct] = useState(null)

    const {itemId} = useParams()

    useEffect(() => {
        const nuevoDoc = doc(db, 'products', itemId);

        getDoc(nuevoDoc)
        .then(res => {
            const data = res.data();
            const nuevoProducto = {id: res.id, ...data}
            setProduct(nuevoProducto);
        })
        .catch(error => console.log(error))

    },[itemId])


/*
    useEffect(() =>{
        getProductById(itemId)
            .then(response => {
                setProduct(response)
            })
            .catch(error => {
                console.error(error)
            })
    }, [itemId])

    */

  return (
    <div className='ItemDetailContainer'>
        <ItemDetail {...product}/>
    </div>
  )
}

export default ItemDetailContainer