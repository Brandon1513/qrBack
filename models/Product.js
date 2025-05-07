const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre_producto: { type: String, required: true },
  categoria: { type: String, required: true },
  receta: { type: String, required: true },
  presentacion: { type: String, default: "Activo" },
  idioma: { type: String, default: "Dasavena2024" },
  url_especificacion: String,
  url_etiqueta_gral: String,
  url_esp_con_impresion: String,
  url_esp_sin_impresion: String,
  url_sprand: String,
  url_growlink: String,
  codigo_barras: String, // ✅ nuevo campo
});

const ProductModel = mongoose.model("Productos", productSchema);

module.exports = ProductModel;
