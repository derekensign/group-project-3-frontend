import '../styles/Cart.css'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GlobalStore } from '../contexts/GlobalStore'

const Cart = () => {
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState({})
    
    const fetchCart = () => {
        console.log(user.id)
        axios.get(`${process.env.REACT_APP_BACKEND}/users/cart`, {
            headers: {
                Authorization: user.id
            }
        })
        .then(res => {
            console.log('fetchCart res', res);
            setCart(res.data.products)
        })
        .catch(error => {
            console.error(error);
        })
    }
    
    useEffect(fetchCart, [user])
    
    useEffect(() => {
        const sum = cart.reduce((total, item) => {
            return total + parseFloat(item.price)
        }, 0)
        const tax = (sum * 0.08).toFixed(2)
        setCartTotal({sum, tax})
    }, [cart])

    return (
        <div className="cartContainer">
            <h3>Cart</h3>
            {cart && cart.map(item => (
                <div className="itemRow">
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                </div>
            ))}
            <h3 className="cartTotal">Total: $
                <span className="sum">{cartTotal.sum}</span>
            </h3>
            <h3 className="cartTotal">Tax: $
                <span className="tax">{cartTotal.tax}</span>
            </h3>
        </div>
    )
}

export default Cart