const express = require("express");

const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controllers
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  starRating,
  listRelated,
  searchFilters,
} = require("../controllers/product");

//route
router.get("/products/total", productsCount);
router.get("/products", list);
router.get("/products/:count", listAll);

router.post("/product", authCheck, adminCheck, create);
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

//rating
router.put("/product/rating/:productId", authCheck, starRating);
router.get("/product/related/:productId", listRelated);

router.post("/products/filter", searchFilters);

module.exports = router;
