const products =[
    {
        id: '1',
        name: 'Man. City',
        price: 25000,
        category: 'camiseta',
        img: 'https://marcadegol.com/fotos/2018/05/manchester-city-nike-home-kit-2018-19.jpg',
        stock: 20,
        description: 'Manchester City camiseta talle: L',
    },
    {
        id: '2',
        name: 'Man. United',
        price: 15000,
        category: 'short',
        img: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/5c3b0ad0c567497a8598ab7b011efa99_9366/Shorts_Local_Manchester_United_20-21_Blanco_FM4289_01_laydown.jpg',
        stock: 17,
        description: 'Manchester United short talle: S',
    },
    {
        id: '3',
        name: 'Brasil',
        price: 15000,
        category: 'campera',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjM7KWXDPtP8WTTRMnX6mCrJmZw7oITt-z4hgOOmXkQSQ2Ov_iuef9ylDr-mn74hbU6Sw&usqp=CAU',
        stock: 17,
        description: 'Brasil campera talle: XL',
    },
]

export const getProducts = () => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(products)
        }, 500)
    })
}

export const getProductById = (productId) => {
    return new Promise ((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
        }, 500)
    })
}

export const getProductsByCategory = (productCategory) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products.filter((prod) => prod.category === productCategory));
      }, 500);
    });
  };
  