const express = require("express");

const router = express.Router();

//Middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//Controllers
const { orders, orderStatus } = require("../controllers/admin");

//route
router.get("/admin/orders", authCheck, adminCheck, orders);
router.put("/admin/order/status", authCheck, adminCheck, orderStatus);

module.exports = router;
