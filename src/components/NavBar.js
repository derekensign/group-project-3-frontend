import '../styles/NavBar.css'
import { useContext, useState } from 'react'
import { GlobalStore } from '../contexts/GlobalStore'
import { Link } from 'react-router-dom'

function NavBar() {
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [drop, setDrop] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('userId')
        setUser({})
    }

    return (
        <div className="navBar">
            <Link to="/" className="navBrand navLink">Brand</Link>
            <span>
                <Link to="/products" className="navLink">
                    Shop
                </Link>
                
                <Link to="/users/signup" className="navLink">
                    Signup
                </Link>
                
                <Link to="/users/login" className="navLink">
                    Login
                </Link>

                <span
                    className="dropDownBtn navLink"
                    onClick={()=>setDrop(!drop)}
                >
                    Account
                </span>
                
                {drop && 
                <span className="accountDropDown">
                    <Link
                        to="/users/account/cart"
                        className="navLink"
                    >
                        Cart
                    </Link>
                    <Link
                        to="/users/account/orders"
                        className="navLink"
                    >
                        Orders
                    </Link>
                    <span className="logoutSpan navLink"
                        onClick={handleLogout}
                    >
                        Logout
                    </span>
                </span>
                }
            </span>
        </div>
    )
}

export default NavBar