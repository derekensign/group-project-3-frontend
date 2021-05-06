import './App.css';
import { GlobalStore } from './contexts/GlobalStore'
import { useEffect, useContext } from 'react'
import { Route } from 'react-router-dom'

import NavBar from './components/NavBar';
import Home from './views/Home'
import Signup from './components/forms/Signup'
import Login from './components/forms/Login'
import Products from './views/Products'
import ShowProduct from './views/ShowProduct'

function App() {
    const { userState, fetchUser } = useContext(GlobalStore)
    const [user, setUser] = userState
    
    useEffect(() => {
      fetchUser()
    }, [])

    return (
      <div className="App">
        <NavBar />

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path = '/products'>
          <Products />
        </Route>

        <Route exact path = '/products/:id'>
          <ShowProduct />
        </Route>

      </div>
    );
}

export default App;
