const Product = require("../models/Product");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.registerProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    });

    await newProduct.save();

    res.status(201).json({ product: newProduct });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status().json({ message: "Error al obtener los productos" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
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
  } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    product.nombre_producto = nombre_producto || product.nombre_producto;
    product.categoria = categoria || product.categoria;
    product.receta = receta || product.receta;
    product.presentacion = presentacion || product.presentacion;
    product.idioma = idioma || product.idioma;
    product.url_especificacion =
      url_especificacion || product.url_especificacion;
    product.url_etiqueta_gral = url_etiqueta_gral || product.url_etiqueta_gral;
    product.url_esp_con_impresion =
      url_esp_con_impresion || product.url_esp_con_impresion;
    product.url_esp_sin_impresion =
      url_esp_sin_impresion || product.url_esp_sin_impresion;
    product.url_sprand = url_sprand || product.url_sprand;
    product.url_growlink = url_growlink || product.url_growlink;

    const updateProduct = await product.save();

    res.status(200).json(updateProduct);
  } catch (error) {
    console.error("Error al actualizar el usuario: ", error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

exports.deleteProduct = async(req, res) => {
  const {id} = req.params;

  try {
    const deletedUser = await Product.findByIdAndDelete(id);

    if(!deletedUser){
      return res.status(404).json({message: "Usuario no encontrado"});
    }

    res.json({ message: "Usuario eliminado exitosamente"});
  } catch (error) {
    console.error("Error al eliminar el usuario: ", error);
    res.status(500).json({ message: "Error al eliminar el usuario"});
  }
};
