const express = require("express");

const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controllers
const {
  create,
  read,
  update,
  remove,
  list,
  productList,
} = require("../controllers/subCategory");

//route
router.post("/sub-category", authCheck, adminCheck, create);
router.get("/sub-category/:slug", read);
router.get("/sub-category/products/:slug", productList);
router.get("/sub-categories", list);
router.put("/sub-category/:slug", authCheck, adminCheck, update);
router.delete("/sub-category/:slug", authCheck, adminCheck, remove);

module.exports = router;
