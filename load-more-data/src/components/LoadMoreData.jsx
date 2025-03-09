import { useEffect, useState } from "react";
import "./styles/LoadMoreDataLightGradient.css";
export default function LoadMoreData({ limit, url }) {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  async function fetchProducts() {
    try {
      setLoading(true);
      const response = await fetch(
        `${url}?limit=${limit}&skip=${count === 0 ? 0 : count * limit}`
      );

      const result = await response.json();

      if (result && result.products && result.products.length) {
        setProducts((prevProducts) => [...prevProducts, ...result.products]);
        setLoading(false);
      } else {
        setDisabledButton(true);
      }
    } catch (error) {
      console.log("Error with fetch: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  // Fetch products on count change
  useEffect(() => {
    fetchProducts();
  }, [count]); // Triggers only when `count` changes

  // Disable button if no products
  useEffect(() => {
    setDisabledButton(products.length === 0);
  }, [products]);
  return (
    <>
      <div className="main-container">
        {/* Products Container */}
        <div className="products-container">
          {products.map((product, index) => (
            <div key={`${product.title}-${index}`} className="products-list">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <h5>Price: ${product.price}</h5>
              <p>Rating: {product.rating}</p>
            </div>
          ))}
        </div>
        <button disabled={disabledButton} onClick={() => setCount(count + 1)}>
          {loading ? "Loading..." : "Load more products"}
        </button>
      </div>
    </>
  );
}
