function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getNewProductForm(req, res) {
  res.render("admin/products/new-product");
}

function createNewProduct(req, res) {
  console.log(req.body);
  console.log(req.file);
  
  res.redirect("/admin/products");
}

module.exports = {
    getProducts,
    getNewProductForm,
    createNewProduct
};