class Cart{
        constructor(items = [], totaleQuantity = 0, totalPrice = 0){
            this.items = items;
            this.totalQuantity = totaleQuantity;
            this.totalPrice = totalPrice;
        }}{
            this.items = items;
        }
        addItem(product){
const cartItem = {
    product: product,
    quantity: 1,
    totalPrice: product.price
};

            for (let i = 0; i < this.items.length; i++){
                const item = this.items[i];
                if (item.product.id === product.id){
                   cartItem.quantity = item.quantity + 1;
                     cartItem.totalPrice = cartItem.quantity * product.price;
                     this.items[i] = cartItem;
                        this.totalQuantity++;
                        this.totalPrice += cartItem.totalPrice;
                     return;
                }
            this.items.push(cartItem);
            this.totalQuantity += cartItem.quantity;
            this.totalPrice += cartItem.totalPrice;
        }
    }
module.exports = Cart;