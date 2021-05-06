import axios from 'axios'
import { useState, useEffect } from 'react'

const Products = () => {
    const [allProducts, setAllProducts] = useState([])

    const fetchProducts = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/products`)
        .then((response) => {
            console.log(response);
            setAllProducts(response.data.products)
        })
    }

    useEffect(fetchProducts, [])

    const productList = (arr) => {
        return (
           arr.map(product => (
                <div>
                   <h1>
                    {product.name}
                   </h1>
                   <p>
                    {product.price}
                   </p>
                   <img src = {product.image} ></img>
                </div>
           )) 
        )
    }

    return (
        <div className = 'view productsView'>
            {productList(allProducts)}
        </div>
    )
}

export default Products;