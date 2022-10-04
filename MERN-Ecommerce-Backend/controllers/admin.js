const Order = require("../models/order");

exports.orders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("products.product")
      .sort("-createdAt")
      .exec();

    res.json(orders);
  } catch (error) {
    console.log(error);
  }
};

exports.orderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  try {
    const updated = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    ).exec();

    res.json(updated);
  } catch (error) {
    console.log(error);
  }
};
