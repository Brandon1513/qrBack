const express = require("express");
const { check } = require("express-validator");
const { registerProduct } = require("../controllers/productController");
const auth = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

const router = express.Router();

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

module.exports = router;
