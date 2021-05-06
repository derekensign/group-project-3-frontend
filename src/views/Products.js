import axios from 'axios'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import ProductCard from '../components/ProductCard'

const Products = () => {
    const [allProducts, setAllProducts] = useState([])
    const [redirect, setRedirect] = useState('')

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
                <ProductCard
                    // key={product.id}
                    product={product}
                    setRedirect={setRedirect}
                />
           )) 
        )
    }

    return (
        <div className = 'view productsView'>

            {redirect && <Redirect to={`/products/${redirect}`} />}

            {productList(allProducts)}
        </div>
    )
}

export default Products;