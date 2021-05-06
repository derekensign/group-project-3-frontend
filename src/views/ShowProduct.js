import '../styles/ShowProduct.css'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { GlobalStore } from '../contexts/GlobalStore'
import { useParams } from 'react-router-dom'


const ShowProduct = () => {
    const { id } = useParams()
    const [product, setProduct] = useState({})
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState

    const fetchProduct = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/products/${id}`)
        .then((response) => {
            console.log(response);
            setProduct(response.data.product)
        })
    }

    const addToCart = () => {
        axios.post(`${process.env.REACT_APP_BACKEND}/users/cart/${id}`, {}, {
            headers: {Authorization: user.id}
        })
        .then((response) => {
            console.log(response)
        })
    }

    useEffect(fetchProduct, [])

    return (
        <div className="view showProductView">
            <div className="topContainer">
                <div className="imgContainer">
                    <img src={product.image} />
                </div>
                <div className="infoDiv">
                    <p>{product.name}</p>
                    <p>{product.price}</p>
                    <div className="buyForm">
                        <button onClick={() => addToCart()}>Add To Cart</button>
                    </div>
                </div>
            </div>
            <div className="detailsDiv">
                <p>Details</p>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default ShowProduct