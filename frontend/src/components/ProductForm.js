import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProductForm() {
  const [formData, setFormData] = useState({
    store_name: "",
    product_name: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/products", formData);
    navigate("/product");
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="store_name"
          placeholder="Store Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
