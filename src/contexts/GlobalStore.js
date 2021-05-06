import axios from 'axios'
import { useState, createContext } from 'react'

const GlobalStore = createContext()

const Provider = ({children}) => {
    // define values
    const [user, setUser] = useState({})
    
    const fetchUser = () => {
        const userId = localStorage.getItem('userId')
        axios.get(`${process.env.REACT_APP_BACKEND}/users/verify`, {
            headers: {
                Authorization: userId
            }
        })
            .then(res => {
                console.log('fetchUser res', res)
                if (res.data.user) {
                    console.log('user verified', res.data.user);
                    setUser(res.data.user)
                }
            })
            .catch(error => {
                console.error(error)
            })
    }

    // create store
    const store = {
        userState: [user, setUser],
        fetchUser
    }

    // return the context with the store value
    return (
        <GlobalStore.Provider value={store}>
            {children}
        </GlobalStore.Provider>
    )
}

export { GlobalStore, Provider }