function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getNewProductForm(req, res) {
  res.render("admin/products/new-product");
}

function createNewProduct(req, res) {
  // Implementation for creating a new product would go here
  res.redirect("/admin/products");
}

module.exports = {
    getProducts,
    getNewProductForm,
    createNewProduct
};