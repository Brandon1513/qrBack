const express = require("express");
const { check } = require("express-validator");
const {
  registerProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

//Ruta para registrar usuarios
router.post(
  "/register-product",
  auth,
  isAdmin,
  [
    check("nombre_producto")
      .not()
      .isEmpty()
      .withMessage("El nombre del producto es requerido"),
    check("categoria")
      .not()
      .isEmpty()
      .withMessage("El nombre de la categoria es requerida"),
    check("receta")
      .not()
      .isEmpty()
      .withMessage("El nombre de la receta es requerida"),
    check("presentacion")
      .not()
      .isEmpty()
      .withMessage("El nombre de la presentacion es requerida"),
    check("idioma").not().isEmpty().withMessage("El idioma es requerido"),
  ],
  registerProduct
);

//Ruta para obtener los productos
router.get("/dataProducts", getAllProducts);

//Ruta para actualizar los productos
router.put("/update-product/:id", auth, updateProduct);

//Ruta para eliminar productos
router.delete("/delete/:id", deleteProduct);

module.exports = router;
