import axios from 'axios'
import '../styles/OrderHistory.css'
import { useState, useEffect, useContext } from 'react'
import { GlobalStore } from '../contexts/GlobalStore'

const OrderHistory = () => {
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [orders, setOrders] = useState([])

    const parseOrder = (arr) => {
        let orders = arr.map(order => {
            let obj = {}
            obj.date = order.createdAt
            let productsArr = order.order
            let split = productsArr.map(product => (
                product.split('\"')
            ))
            console.log(split);
            let builtProducts = split.map(product => {
                let productObj = {
                    name: product[5],
                    description: product[9],
                    image: product[13],
                    price: product[17]
                }
                return productObj
            })
            console.log(builtProducts)
            obj.products = builtProducts
            console.log(obj);
            return obj
        })
        console.log(orders);
        setOrders(orders)
    }

    const fetchOrders = () => {
        axios.get(`${process.env.REACT_APP_BACKEND}/users/orders`, {
            headers: {
                Authorization: user.id
            }
        })
            .then(res => {
                console.log('fetchOrders res', res);
                parseOrder(res.data.orders)
            })
            .catch(error => console.error(error))
    }
    useEffect(fetchOrders, [])

    return (
        <div className="orderContainer">
            {orders.map(order => (
                <div>
                    <p className="orderDate">
                    {order.date}
                    </p>
                    {order.products.map(product => (
                        <div className="orderProduct">
                            <p>{product.name}</p>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default OrderHistory