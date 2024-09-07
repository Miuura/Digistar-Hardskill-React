import { useState, useEffect } from "react";
import styles from "./cycle.module.css";
import { Link } from "react-router-dom";

const ProductFunc = () => {
    const [ Loading, setLoading ] = useState(false)
    const [ Product, setProduct ] = useState([])
    const [ Params, setParams ] = useState({
        limit: 9,
        skip: 0,
    });

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                setLoading(true);
                const result = await fetch(
                    `https://dummyjson.com/products?limit=${Params.limit}&skip=${Params.skip}`
                )
                const data = await result.json();
                setProduct(data.products);
            } catch (error) {
                console.log('error > ', error);
            } finally {
                setLoading(false)
            }
        }
    
        fetchProducts()
    }, [Params.skip])

    return (
        <div className={styles.container}>
            <header className={styles.heading}>
                <h1>Products</h1>
                <button type="button" className="btn btn-dark">
                    <Link to={"add"} style={{ color: "inherit", textDecoration: "none" }}>
                        Add Product
                    </Link>
                </button>
            </header>
            <div>
                {Loading ? (
                    "loading..."
                ) : (
                    <div className={styles.productsContainer}>
                        {Product?.map((item, idx) => (
                            <div key={idx} className={styles.productsItem} class="card">
                                <img 
                                    src={item.images?.[0]}
                                    class="card-img-top" 
                                    alt={`product-cover-${idx}`}
                                    width={200}
                                    height={300}
                                    style={{ objectFit: 'cover' }}
                                />
                                <div class="card-body">
                                    <h5 class="card-title">{item.title}</h5>
                                    <p class="card-text">{item.description.slice(0, 120)}</p>
                                    <a href="#" class="btn btn-primary">Add to Cart</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.paginationContainer}>
                <button
                 type="button"
                 onClick={() =>
                    setParams((prevState) => ({
                        ...prevState,
                        skip: Math.max(prevState.skip - 9, 0),
                    }))
                 }
                >
                    Prev
                </button>
                <button
                 type="button"
                 onClick={() =>
                    setParams((prevState) => ({
                        ...prevState,
                        skip: Math.max(prevState.skip + 9, 0),
                    }))
                 }
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ProductFunc;
