import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    await axios.get("http://localhost:3001/products").then((response) => {
      setProducts(response.data);
    });
  };
  useEffect(() => {
    getData();
  });

  const deleteItem = (id) => {
    axios.delete(`http://localhost:3001/products/${id}`);
    getData();
  };

  return (
    <div className="container">
      <h2>Product List</h2>
      <Link to="/add" className="btn btn-primary">
        Add Product
      </Link>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>{product.product_name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <Link to={`/product/${product.id}`} className="btn btn-info">
              View
            </Link>
            <button onClick={() => deleteItem(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
