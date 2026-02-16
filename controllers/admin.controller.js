const Product = require("../models/product.model");


async function getProducts(req, res,next) {
  try {
  const products = await Product.findAll();
  res.render("admin/products/all-products", { products: products });
}
catch(error){
  next(error);
  return;
}
}

async function createNewProduct(req, res) {
  console.log(req.body);
  console.log(req.file);
  const product = new Product({...req.body, image: req.file.filename});
  try {
  await product.save();}
  catch(error){
    next(error);
  }
  res.redirect("/admin/products");
}

module.exports = {
    getProducts,
    getNewProductForm,
    createNewProduct
};