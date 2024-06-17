const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
let categori = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Perabotan" },
];
let product = [
  { id: 1, name: "Laptop", category: "Elektronik" },
  { id: 2, name: "Meja", category: "Perabotan" },
];

//GET yang mengembalikan daftar semua kategori produk
app.get("/categori", (req, res) => {
  res.json(categori);
});

//GET yang mengembalikan detail kategori berdasarkan ID
app.get("/categori/:id", (req, res) => {
  const categories = categori.find((ctg) => ctg.id === parseInt(req.params.id));
  if (!categories) return res.status(404).send("Categories not found");
  res.json(categories);
});

//route POST yang menambahkan kategori baru ke array
app.post("/categori", (req, res) => {
  const inputCategori = {
    id: categori.length + 1,
    name: req.body.name,
  };
  categori.push(inputCategori);
  res.status(201).json(inputCategori);
});

//route PUT yang memperbarui kategori berdasarkan ID
app.put("/categori/:id", (req, res) => {
  const categories = categori.find((ctg) => ctg.id === parseInt(req.params.id));
  if (!categories) return res.status(404).send("Cetegories not found");
  if (req.body.name) {
    categories.name = req.body.name;
  }
  res.json(categories);
});

//route DELETE yang menghapus kategori berdasarkan ID
app.delete("/categori/:id", (req, res) => {
  const categories = categori.findIndex(
    (ctg) => ctg.id === parseInt(req.params.id)
  );
  if (categories === -1) return res.status(404).send("Cetegories not found");
  const delCategories = categori.splice(categories, 1);
  res.json(delCategories);
});

//route GET dengan query string untuk mencari produk berdasarkan nama.
app.get("/product/serach", (req, res) => {
  const { name } = req.query;
  if (name) {
    const filter = product.filter((f) =>
      f.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(filter);
  }
});

//route GET dengan parameter dan query string untuk mendapatkan produk dalam kategori
app.get("/product/search/category/:category", (req, res) => {
  const { name } = req.query;
  const { category } = req.params;
  let filter = product.filter((f) =>
    f.category.toLowerCase().includes(category.toLowerCase())
  );
  if (name) {
    filter = filter.filter((f) =>
      f.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  res.json(filter);
});

app.listen(PORT, console.log(`Server is runing on http:localhost:${PORT}`));
