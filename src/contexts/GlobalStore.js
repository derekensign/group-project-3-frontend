import axios from 'axios'
import { useState, createContext } from 'react'

const GlobalStore = createContext()

const Provider = ({children}) => {
    // define values
    const [user, setUser] = useState({})
    const [cart, setCart] = useState([])
    
    const fetchUser = () => {
        const userId = localStorage.getItem('userId')
        axios.get(`${process.env.REACT_APP_BACKEND}/users/verify`, {
            headers: {
                Authorization: userId
            }
        })
            .then(res => {
                // console.log('fetchUser res', res)
                if (res.data.user) {
                    console.log('user verified', res.data.user);
                    setUser(res.data.user)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

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

    // create store
    const store = {
        userState: [user, setUser],
        fetchUser,
        cartState: [cart, setCart],
        fetchCart
    }

    // return the context with the store value
    return (
        <GlobalStore.Provider value={store}>
            {children}
        </GlobalStore.Provider>
    )
}

export { GlobalStore, Provider }