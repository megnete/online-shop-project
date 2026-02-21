const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-uploads');

const router = express.Router();

router.get('/products', adminController.getProducts);
router.get('/products/new', adminController.getNewProductForm);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProductForm);

router.post('/products/:id', adminController.updateProduct);

module.exports = router;