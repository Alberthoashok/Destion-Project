import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DetailView.css"; // Import the new CSS file

function DetailView() {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices"));
    if (storedInvoices) {
      const invoice = storedInvoices.find(
        (each) => each.orderId === parseInt(id)
      );
      setList(invoice);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <h1 className="loading-text">Loading...</h1>;
  }

  return list ? (
    <div className="invoice-detail-container">
      <div className="invoice-card">
        <h1 className="store-name">{list.storeName}</h1>
        <p className="invoice-date">Date: {list.date}</p>
        <p>
          Quantity: <strong>{list.quantity}</strong>
        </p>
        <p>
          Regular Price: <strong>${list.regularPrice}</strong>
        </p>
        <p>
          Deal Price: <strong>${list.dealPrice}</strong>
        </p>
        <p>
          Item Tax: <strong>{(list.itemTax * 100).toFixed(1)}%</strong>
        </p>
        <h2 className="total-price">
          Total: ${(list.dealPrice * list.quantity).toFixed(2)}
        </h2>
      </div>
    </div>
  ) : (
    <h1 className="error-message">Invoice Not Found</h1>
  );
}

export default DetailView;
