const express = require("express");

const router = express.Router();

//Middlewares
const { authCheck } = require("../middlewares/auth");

//Controllers
const { createPaymentIntent } = require("../controllers/stripe");

//route
router.post("/payment-intent", authCheck, createPaymentIntent);

module.exports = router;
