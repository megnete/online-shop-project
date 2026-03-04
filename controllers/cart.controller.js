function addCartItem(req, res) {
    res.locals.cart.addItem(req.body.productId);
}

    module.exports = {
    addCartItem
}