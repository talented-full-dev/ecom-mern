const SubCategory = require("../models/subCategory");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const subCategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name),
    }).save();
    res.json(subCategory);
  } catch (error) {
    res.status(400).send("Create sub-category failed");
  }
};
exports.read = async (req, res) => {
  const data = await SubCategory.findOne({ slug: req.params.slug });
  res.json(data);
};
exports.remove = async (req, res) => {
  try {
    const data = await SubCategory.findOneAndDelete({ slug: req.params.slug });
    res.json(data);
  } catch (error) {
    res.status(400).send("Delete sub-category failed");
  }
};
exports.list = async (req, res) => {
  const data = await SubCategory.find({}).sort({ createdAt: -1 }).exec();
  res.json(data);
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const data = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(data);
  } catch (error) {
    res.status(400).send("Update sub-category failed");
  }
};

exports.productList = async (req, res) => {
  const subCategories = await SubCategory.findOne({ slug: req.params.slug });
  const products = await Product.find({ subCategories })
    .populate("category")
    .exec();
  res.json(products);
};
