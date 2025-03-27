require("dotenv").config({ path: ".env" });
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const qrRoutes = require("./routes/qrRoutes");
/*PDF*/
const pdfRoutes = require("./routes/pdfRoutes");
const path = require("path");

//Recetas
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

/*PDF*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ruta User
app.use("/user", require("./routes/userRoutes"));
// Ruta QR
app.use("/qr", qrRoutes);

//Rutas PDF
app.use("/api", pdfRoutes);

//Ruta Recetas
app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
