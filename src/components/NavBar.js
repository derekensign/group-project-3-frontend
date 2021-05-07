import '../styles/NavBar.css'
import { useContext, useState } from 'react'
import { GlobalStore } from '../contexts/GlobalStore'
import { Link, useHistory } from 'react-router-dom'

function NavBar() {
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [drop, setDrop] = useState(false)
    const history = useHistory()

    const handleLogout = () => {
        localStorage.removeItem('userId')
        setUser({})
        history.push("/")
    }

    return (
        <div className="navBar">
            <Link to="/" className="navBrand navLink">Shoppe</Link>
            <span>
                <Link to="/products" className="navLink">
                    Shop
                </Link>
            
            {user.id ? 
                <>
                    <span
                        className="dropDownBtn navLink"
                        onClick={()=>setDrop(!drop)}
                    >
                        Account
                    </span>
                    
                    {drop && 
                        <span className="accountDropDown">
                            <Link
                                to="/account"
                                className="navLink"
                            >
                                Account
                            </Link>
                            <span className="logoutSpan navLink"
                                onClick={handleLogout}
                            >
                                Logout
                            </span>
                        </span>
                    }   
                </>
            
                
                :
                <span>
                    <Link to="/signup" className="navLink">
                        Signup
                    </Link>
                    
                    <Link to="/login" className="navLink">
                        Login
                    </Link>
                </span>
                
            }      
            </span>
        </div>
    )
}

export default NavBar