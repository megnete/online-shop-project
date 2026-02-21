const mongodb = require('mongodb');

const db = require('../data/database');

class Product {
    constructor(productData){
        this.title = productData.title;
        this.image = productData.image;
        this.summary = productData.summary;
        this.price = +productData.price;
        this.description = productData.description;
        this.imagePath = `product-data/images/${productData.image}`;
        this.imageUrl = `/products/assets/images/${productData.image}`;
        if (productData._id){
        this.id = productData._id.toString(); 
    }
    }

    static async findById(productId){
let prodID;
try {
    prodID = new mongodb.ObjectId(productId);
}
catch(error){
     error.code = 404;
           throw error;}

        const product = await db.getDb().collection('products').findOne({_id: productId});
        if (!product) {
           const error = new Error('Could not find product with id ' + productId);
           error.code = 404;
           throw error;
        }
        return new Product(product);
    }

static async findAll(){
    const products = await db.getDb().collection('products').find().toArray();
return products.map(function(productDocument){
    return new Product(productDocument);});
}

    async save() {
        const productData = {
            title: this.title,
            summary: this.summary,
            price: this.price,
            description: this.description,
        };
        await db.getDb().collection('products').insertOne(productData);
}
}

module.exports = Product;