const Product = require("../models/product.model");
const { get } = require("../routes/admin.routes");


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

function getUpdateProduct(req, res,) {
  try{
const product = Product.findById(req.params.id);
res.render("admin/products/update-product", { product: product });
  }catch(error){
    next(error);
  }
  
}

async function updateProduct(req,res){
  const product = new Product({...req.body, _id: req.params.id});
  if (req.file){
    product.replaceImage(req.file.filename);
  }

  try{
  await product.save();
}
catch(error){
  next(error);
  return;
}
  res.redirect("/admin/products");
}
module.exports = {
    getProducts,
    getNewProductForm,
    createNewProduct,
    getUpdateProduct,
    updateProduct
};