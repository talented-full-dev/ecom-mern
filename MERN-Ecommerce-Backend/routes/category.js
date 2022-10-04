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
  getSubCategories,
  categoryProducts,
} = require("../controllers/category");

//route
router.post("/category", authCheck, adminCheck, create);
router.get("/category/:slug", read);
router.get("/category/products/:slug", categoryProducts);
router.get("/categories", list);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/category/subs/:_id", getSubCategories);

module.exports = router;
