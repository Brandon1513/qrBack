const Product = require("../models/Product");
const { validationResult } = require("express-validator");

// Crear nuevo producto
exports.registerProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("BODY REGISTER PRODUCT:", req.body);

  const {
    nombre_producto,
    categoria,
    receta,
    presentacion,
    idioma,
    url_especificacion,
    url_etiqueta_gral,
    url_esp_con_impresion,
    url_esp_sin_impresion,
    url_sprand,
    url_growlink,
    codigo_barras,
  } = req.body;

  try {
    const newProduct = new Product({
      nombre_producto,
      categoria,
      receta,
      presentacion,
      idioma,
      url_especificacion,
      url_etiqueta_gral,
      url_esp_con_impresion,
      url_esp_sin_impresion,
      url_sprand,
      url_growlink,
      codigo_barras,
    });

    await newProduct.save();

    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor", error: error.message });
  }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Actualizar producto existente
exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  console.log("BODY UPDATE PRODUCT:", req.body);

  const {
    nombre_producto,
    categoria,
    receta,
    presentacion,
    idioma,
    url_especificacion,
    url_etiqueta_gral,
    url_esp_con_impresion,
    url_esp_sin_impresion,
    url_sprand,
    url_growlink,
    codigo_barras
  } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.nombre_producto = nombre_producto || product.nombre_producto;
    product.categoria = categoria || product.categoria;
    product.receta = receta || product.receta;
    product.presentacion = presentacion || product.presentacion;
    product.idioma = idioma || product.idioma;
    product.url_especificacion = url_especificacion || product.url_especificacion;
    product.url_etiqueta_gral = url_etiqueta_gral || product.url_etiqueta_gral;
    product.url_esp_con_impresion = url_esp_con_impresion || product.url_esp_con_impresion;
    product.url_esp_sin_impresion = url_esp_sin_impresion || product.url_esp_sin_impresion;
    product.url_sprand = url_sprand || product.url_sprand;
    product.url_growlink = url_growlink || product.url_growlink;
    product.codigo_barras = codigo_barras || product.codigo_barras;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error al actualizar el producto: ", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el producto: ", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

// Filtrar productos
exports.filterProduct = async (req, res) => {
  try {
    const { categoria, receta, presentacion, idioma } = req.query;

    const filter = {};
    if (categoria) filter.categoria = categoria;
    if (receta) filter.receta = receta;
    if (presentacion) filter.presentacion = presentacion;
    if (idioma) filter.idioma = idioma;

    const productos = Object.keys(filter).length > 0
      ? await Product.find(filter)
      : await Product.find();

    if (!productos.length) {
      return res.status(404).json({
        message: "No se encontraron productos con los filtros seleccionados.",
      });
    }

    res.json(productos);
  } catch (error) {
    console.error("Error en la búsqueda de productos:", error);
    res.status(500).json({ message: "Error interno del servidor al obtener productos." });
  }
};
