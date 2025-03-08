import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) return <h2>Loading...</h2>;



  return (
    <div className="container">
      <h2>{product.product_name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <Link to="/product" className="btn btn-secondary">
        Back
      </Link>
    </div>
  );
}

export default ProductDetail;
