import '../styles/Account.css'
import axios from 'axios'
import Cart from '../components/Cart'
import OrderHistory from '../components/OrderHistory'

// get everything in cart for a user id

// cart display

// previous order display

// account information

const Account = () => {
    return (
        <div className="view showAccountView">
            <div className="accountWrapper">
                <div className="cartOrderContainer">
                    <Cart />
                    <OrderHistory />
                </div>
                <div className="accountContainer">
                    Account stuffs
                </div>
            </div>
        </div>
    )
}

export default Account