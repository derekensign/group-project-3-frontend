import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GlobalStore } from '../contexts/GlobalStore'

const Cart = () => {
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [cart, setCart] = useState([])

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

    return (
        <div>
            {cart && cart.map(item => (
                <p>{item.name}</p>
        ))}
        </div>
    )
}

export default Cart