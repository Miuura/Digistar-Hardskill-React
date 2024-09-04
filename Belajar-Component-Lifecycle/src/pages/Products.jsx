import { Component } from "react";
import styles from "./cycle.module.css";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      counter: 0,
      params: {
        limit: 9,
        skip: 0,
      },
    };
    this.prevSkip = 0; // Track the previous skip value
  }

  async componentDidMount() { 
    this.fetchProducts(this.state.params.limit, this.state.params.skip)
	}

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.params.skip !== prevState.params.skip) {
      // Only fetch products if skip value has changed
      console.log(this.state.params.skip)
      this.fetchProducts(this.state.params.limit, this.state.params.skip)
    }
  }

  async fetchProducts(limit, skip) {
    try {
      this.setState({ loading: true });
      const result = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await result.json();
      this.setState({ products: data.products });
    } catch (error) {
      console.log("error > ", error);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>Products</h1>
        <div>
          {this.state.loading ? (
            "loading..."
          ) : (
            <div className={styles.productsContainer}>
              {this.state.products?.map((item, idx) => (
                // <div key={idx} className={styles.productsItem}>
                //   <img
                //     className={styles.productsItemCover}
                //     src={item.images?.[0]}
                //     alt={`product-cover-${idx}`}
                //   />
                //   <span>{item.title}</span>
                // </div>
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
                    <a href="#" class="btn btn-primary">Add to Chart</a>
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
              this.setState((state) => ({
                ...state,
                params: {
                  ...state.params,
                  skip: Math.max(state.params.skip - 9, 0),
                },
              }))
            }
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                params: {
                  ...state.params,
                  skip: state.params.skip + 9,
                },
              }))
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Products;