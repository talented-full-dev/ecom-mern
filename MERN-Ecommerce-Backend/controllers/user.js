const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
var uniqid = require("uniqid");

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];
  const user = await User.findOne({ email: res.user.email }).exec();

  let cartExist = await Cart.findOne({ orderedBy: user._id }).exec();
  if (cartExist) {
    cartExist.remove();
  }
  let total = 0;
  for (let p of cart) {
    let object = { count: p.count, product: p._id, color: p.color };
    const { price } = await Product.findById(p._id);
    object.price = price;
    products.push(object);
    total += price * p.count;
  }

  let newCart = await new Cart({
    products: products,
    cartTotal: total,
    orderedBy: user._id,
  }).save();

  res.json({ ok: true, cart: newCart });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: res.user.email }).exec();

  let cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;

  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: res.user.email }).exec();

  let cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const user = await User.findOneAndUpdate(
    { email: res.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

exports.applyCoupon = async (req, res) => {
  try {
    const { coupon } = req.body;

    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    if (validCoupon == null) {
      return res.json({
        err: "Invalid coupon",
      });
    }

    const user = await User.findOne({ email: res.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);

    const cart = await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    ).exec();

    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { paymentIntent } = req.body.stripeResponse;

    const user = await User.findOne({ email: res.user.email }).exec();

    let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

    let newOrder = await new Order({
      products,
      paymentIntent,
      orderedBy: user._id,
    }).save();

    //Increment sold and decrement quantity
    let bulkOptions = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    await Product.bulkWrite(bulkOptions, {});

    res.json({ ok: true, order: newOrder });
  } catch (error) {
    console.log(error);
  }
};

exports.createCODOrder = async (req, res) => {
  try {
    const newId = uniqid();
    const user = await User.findOne({ email: res.user.email }).exec();

    const cart = await Cart.findOne({ orderedBy: user._id }).exec();

    let finalAmount = Math.round(cart.cartTotal * 1000);
    if (cart.totalAfterDiscount && cart.cartTotal > cart.totalAfterDiscount) {
      finalAmount = Math.round(cart.totalAfterDiscount * 100);
    }

    let newOrder = await new Order({
      products: cart.products,
      paymentIntent: {
        id: newId,
        amount: finalAmount,
        currency: "usd",
        status: "Cash on Delivery",
        created: Date.now(),
        payment_method_types: ["Cash"],
      },
      orderedBy: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    //Increment sold and decrement quantity
    let bulkOptions = cart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    await Product.bulkWrite(bulkOptions, {});

    res.json({ ok: true, order: newOrder });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrders = async (req, res) => {
  const user = await User.findOne({ email: res.user.email }).exec();

  const orders = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  res.json(orders);
};

exports.addToWishList = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: res.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();
  res.json({ ok: true, user });
};

exports.wishList = async (req, res) => {
  const { wishlist } = await User.findOne({ email: res.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();
  res.json(wishlist);
};

exports.removeFromWishList = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: res.user.email },
    { $pull: { wishlist: productId } },
    { new: true }
  ).exec();
  res.json({ ok: true, user });
};
