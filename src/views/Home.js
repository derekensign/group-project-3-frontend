import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="view homeView">
            <h1>Welcome to Our Shoppe!</h1>
            <Link to="/products">
                Start Shopping!
            </Link>
        </div>
    )
}

export default Home