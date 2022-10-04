const express = require("express");

const router = express.Router();

//Middlewares
const { adminCheck, authCheck } = require("../middlewares/auth");

//Controllers
const { create, remove, list } = require("../controllers/coupon");

//route
router.post("/coupon", authCheck, adminCheck, create);
router.get("/coupons", authCheck, list);
router.delete("/coupon/:couponId", authCheck, adminCheck, remove);

module.exports = router;
