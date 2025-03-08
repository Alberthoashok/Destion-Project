import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./InvoiceGeneration.css"; // Importing CSS file

const Invoices = [
  {
    orderId: 1,
    storeName: "Ganapati Stores",
    date: "01/02/2024",
    quantity: 2,
    regularPrice: 25,
    dealPrice: 20,
    itemTax: 0.2,
  },
  {
    orderId: 2,
    storeName: "Megha Stores",
    date: "08/02/2024",
    quantity: 1,
    regularPrice: 25,
    dealPrice: 20,
    itemTax: 0.2,
  },
  {
    orderId: 3,
    storeName: "Vignesh Stores",
    date: "23/03/2024",
    quantity: 4,
    regularPrice: 25,
    dealPrice: 20,
    itemTax: 0.2,
  },
];

function InvoiceGeneration() {
  const [invoiceList, setInvoiceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(Invoices));
    const storedInvoices = JSON.parse(localStorage.getItem("invoices"));
    setInvoiceList(storedInvoices);
  }, []);

  const getFareSum = () => {
    return invoiceList.reduce(
      (sum, each) => sum + each.dealPrice * each.quantity,
      0
    );
  };

  const getTaxedSum = () => {
    return invoiceList.reduce((taxedSum, each) => {
      let sum = each.quantity * each.dealPrice;
      let totalSum = sum + sum * each.itemTax;
      return taxedSum + totalSum;
    }, 0);
  };

  return (
    <div className="invoice-container">
      <h1 className="title">Invoice Summary</h1>

      {invoiceList.length > 0 ? (
        <div className="invoice-grid">
          {invoiceList.map((each) => (
            <div key={each.orderId} className="invoice-card">
              <h2 className="store-name">{each.storeName}</h2>
              <p className="invoice-date">Date: {each.date}</p>
              <p>
                Quantity: <strong>{each.quantity}</strong>
              </p>
              <p>
                Regular Price: <strong>${each.regularPrice}</strong>
              </p>
              <p>
                Deal Price: <strong>${each.dealPrice}</strong>
              </p>
              <button
                className="view-btn"
                onClick={() => navigate(`/invoice/${each.orderId}`)}>
                View More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="no-invoices">No Invoices Available</h2>
      )}

      <div className="total-section">
        <h2>Total Fare: ${getFareSum().toFixed(2)}</h2>
        <h2>Total with Tax: ${getTaxedSum().toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default InvoiceGeneration;
