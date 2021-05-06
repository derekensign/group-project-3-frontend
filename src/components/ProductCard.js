import '../styles/ProductCard.css'

const ProductCard = (props) => {

    const handleClick = () => {
        props.setRedirect(props.product.id)
    }

    return (
        <div className="productCard"
            onClick={handleClick}
        >
            <div className="imgDiv">
                <img src = {props.product.image}></img>
            </div>
            <p>
                {props.product.name}
            </p>
            <p>
                {props.product.price}
            </p>
        </div>
    )
}

export default ProductCard