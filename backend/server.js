const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");

const dbPath = path.join(__dirname, "practice.db");
const app = express();
app.use(express.json());
const cors = require("cors");
const { request } = require("http");
app.use(cors());
let db = null;

const initializingServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server Running");
    });
  } catch (error) {
    console.log(error);
  }
};
initializingServer();

app.get("/products", async (req, res) => {
  let response = await db.all("SELECT * FROM products");
  res.send(response);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  let response = await db.get(`SELECT * FROM products WHERE id = ${id}`);
  res.send(response);
});

app.post("/products", (req, res) => {
  const { store_name, product_name, description, price } = req.body;
  db.run(
    "INSERT INTO products (store_name, product_name, description, price) VALUES (?, ?, ?, ?)",
    [store_name, product_name, description, price],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { store_name, product_name, description, price } = req.body;
  db.run(
    "UPDATE products SET store_name = ?, product_name = ?, description = ?, price = ? WHERE id = ?",
    [store_name, product_name, description, price, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Product updated successfully" });
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted successfully" });
  });
});
