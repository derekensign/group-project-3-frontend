import axios from 'axios'
import { GlobalStore } from '../../contexts/GlobalStore'
import { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'

function Login() {
    const { userState } = useContext(GlobalStore)
    const [user, setUser] = userState
    const [inputs, setInputs] = useState({})
    const [redirect, setRedirect] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/users/login`, inputs)
            console.log('login response', response)
            if (response.data) {
                localStorage.setItem('userId', response.data.user.id)
                setUser(response.data.user)
                setRedirect(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className="loginForm" onSubmit={handleSubmit}>

            {redirect && <Redirect to="/" />}

            <h2>Log In</h2>

            <label htmlFor="email">Email:</label>
            <input name="email" type="email"
                value={inputs.email || ''}
                onChange={(e) => {
                    setInputs({...inputs, email: e.target.value})
                }}
            />

            <label htmlFor="password">Password:</label>
            <input name="password" type="password"
                value={inputs.password || ''}
                onChange={(e) => {
                    setInputs({...inputs, password: e.target.value})
                }}
            />

            <input type="submit" />

        </form>
    )
}

export default Login