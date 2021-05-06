import './App.css';
import { GlobalStore } from './contexts/GlobalStore'
import { useEffect, useContext } from 'react'
import NavBar from './components/NavBar';

function App() {
    const { userState, fetchUser } = useContext(GlobalStore)
    const [user, setUser] = userState
    
    let local = localStorage.getItem('userId')
    useEffect(() => {
      if (local) {fetchUser()}
    }, [])

    return (
      <div className="App">
        <NavBar />
      </div>
    );
}

export default App;
