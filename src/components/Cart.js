import '../styles/Cart.css'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { GlobalStore } from '../contexts/GlobalStore'
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51IoVLqKFmp10dkyrMj47nEMrxI2JTKR7IT9fmkWKmW1jRIbc1LFYCIoz1c6vi58hsDyLhBIMEmemif5XYnDrc5rG00dlfSDkpI")
// const ProductDisplay = ({ handleClick }) => (
//     <section>
//         <div className="product">
//             <img
//             src="https://i.imgur.com/EHyR2nP.png"
//             alt="The cover of Stubborn Attachments"
//             />
//             <div className="description">
//             <h3>Stubborn Attachments</h3>
//             <h5>$20.00</h5>
//             </div>
//         </div>
//         <button type="button" id="checkout-button" role="link" onClick={handleClick}>
//             Checkout
//         </button>
//     </section>
// );
const Message = ({ message }) => (
    <section>
        <p>{message}</p>
    </section>
);
  
const Cart = () => {
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [cart, setCart] = useState([])
    const [cartTotal, setCartTotal] = useState({})
    const [inputs, setInputs] = useState({})
    const [message, setMessage] = useState("");

    // for Stripe
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
          setMessage("Order placed! You will receive an email confirmation.");
        }
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);
      const handleClick = async (event) => {
        const stripe = await stripePromise;
        const response = await axios.post(`${process.env.REACT_APP_BACKEND}/create-checkout-session`, {
            cart
        })
        // console.log(response);
        const session = await response.data;
        // When the customer clicks on the button, redirect them to Checkout.
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        console.log('payment result', result);
        if (result.error) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
          alert(result.error.message)
        }
      };
    
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
        <>
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
            {/* <h3 className="cartTotal">Tax: $
                <span className="tax">{cartTotal.tax}</span>
            </h3> */}
            <button type="button" id="checkout-button" role="link" onClick={handleClick}>
                Checkout
            </button>
        </div>
        {message ? 
            <Message message={message} />
        : null
            // <ProductDisplay handleClick={handleClick} />
        }
        </>
    )
}

export default Cart