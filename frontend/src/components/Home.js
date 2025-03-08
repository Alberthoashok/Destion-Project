import { Link } from "react-router-dom";
import "./Home.css"; // Import CSS for styling

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Assignment</h1>
      <div className="button-container">
        <Link to="/invoice">
          <button className="home-button">View Invoice</button>
        </Link>
        <Link to="/product">
          <button className="home-button">View Product</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
