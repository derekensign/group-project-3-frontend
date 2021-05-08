import './App.css';
import { GlobalStore } from './contexts/GlobalStore'
import { useEffect, useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import NavBar from './components/NavBar';
import Home from './views/Home'
import Signup from './components/forms/Signup'
import Login from './components/forms/Login'
import Products from './views/Products'
import ShowProduct from './views/ShowProduct'
import Account from './views/Account'
import Success from './views/Success'
import Canceled from './views/Canceled'

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
          {user.id ? 
            <Redirect to="/"/>
            : 
            <Signup />}
        </Route>

        <Route exact path="/login">
        {user.id ? 
            <Redirect to="/"/>
            : 
            <Login  />}
        </Route>

        <Route exact path="/account">
          {user.id ? 
              <Account />
              : 
              <Redirect to="/login"/>}
        </Route>

        <Route exact path = '/products'>
          <Products />
        </Route>

        <Route exact path = '/products/:id'>
          <ShowProduct />
        </Route>

        <Route exact path="/success">
          <Success />
        </Route>

        <Route exact path="/canceled">
          <Canceled />
        </Route>

      </div>
    );
}

export default App;
