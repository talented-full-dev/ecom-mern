const express = require("express");

const router = express.Router();

//Middlewares
const { authCheck } = require("../middlewares/auth");

//Controllers
const {
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  applyCoupon,
  createOrder,
  getOrders,
  addToWishList,
  wishList,
  removeFromWishList,
  createCODOrder,
} = require("../controllers/user");

//route
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);
router.post("/user/address", authCheck, saveAddress);

//Coupon
router.post("/user/coupon", authCheck, applyCoupon);

//Order
router.post("/user/order", authCheck, createOrder);
router.post("/user/order/cod", authCheck, createCODOrder);
router.get("/user/orders", authCheck, getOrders);

//Wishlist
router.post("/user/wishlist", authCheck, addToWishList);
router.get("/user/wishlist", authCheck, wishList);
router.put("/user/wishlist/:productId", authCheck, removeFromWishList);

module.exports = router;
