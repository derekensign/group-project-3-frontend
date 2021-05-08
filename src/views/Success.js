import axios from 'axios'
import { useContext, useEffect } from 'react'
import { GlobalStore } from '../contexts/GlobalStore'

function Success() {
    const { userState, cartState, fetchCart } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [cart, setCart] = cartState

    useEffect(async () => {
        await fetchCart()
        console.log(cart);
        // send cart to orders
        if (cart.length > 0) {
            axios.post(`${process.env.REACT_APP_BACKEND}/users/orders`, {cart}, {
                headers: {
                    Authorization: user.id
                }
            })
                .then(res => {
                    console.log('newOrder res', res);
                })
                .catch(error => console.error(error))
        }
        // clear cart state and db table
    }, [user])

    return (
        <div className="view successfulCheckout">
            <h2>Your payment was processed!</h2>
            <h3>Your items will ship shortly!</h3>
        </div>
    )
}

export default Success