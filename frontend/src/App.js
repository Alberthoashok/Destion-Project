import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvoiceGeneration from "./components/InvoiceGeneration";
import ProductManagement from "./components/ProductManagement";
import Home from "./components/Home";
import DetailView from "./components/DetailView";
import ProductDetail from "./components/ProductDetail";
import ProductForm from "./components/ProductForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invoice" element={<InvoiceGeneration />} />
        <Route path="/product" element={<ProductManagement />} />
        <Route path="/invoice/:id" element={<DetailView />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/add" element={<ProductForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
