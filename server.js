require("dotenv").config({ path: ".env" });
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const qrRoutes = require("./routes/qrRoutes");
const pdfRoutes = require("./routes/pdfRoutes");
const path = require("path");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// ✅ CORS configurado para frontend local y productivo
app.use(cors({
  origin: [
    "http://localhost:5173",              // desarrollo local
    "http://localhost:3000",              // desarrollo local logistica
    "https://recetasdasa.domcloud.dev",    // producción recetasdasa
    "https://logisticaqr.domcloud.dev/" // producción logística
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());

// PDF
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
app.use("/user", require("./routes/userRoutes"));
app.use("/qr", qrRoutes);
app.use("/api", pdfRoutes);
app.use("/products", productRoutes);

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
