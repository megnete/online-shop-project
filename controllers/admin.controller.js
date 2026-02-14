const Product = require("../models/product.model");

function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getNewProductForm(req, res) {
  res.render("admin/products/new-product");
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