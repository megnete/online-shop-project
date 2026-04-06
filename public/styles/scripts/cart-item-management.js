const cartItemUpdateFormElements = document.querySelectorAll(".cart-item-management");
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

async function cartItemUpdateFormSubmitHandler(event) {
    event.preventDefault();

    const form = event.target;
    const productId = form.dataset.productid;
    const csfrToken = form.dataset.csrfToken;
    const quantity = form.firstElementChild.value;
    
    let response;
    try {
        response = await fetch("/cart/items", {  // removed const here
            method: "PATCH",
            body: JSON.stringify({ productId, newQuantity: quantity, _csrf: csfrToken }),
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error updating cart item:", error);
        return;
    }

    if (!response.ok) {
        console.error("Failed to update cart item. Status:", response.status);
        return;
    }

    const responseData = await response.json();
    
    if (!responseData.updatedCartData.updatedItemPrice === 0) {
        form.parentElement.parentElement.remove();}
        else {

    const cartItemTotalPriceElement = form.parentElement.querySelector(".cart-item-price");
    cartItemTotalPriceElement.textContent = responseData.updatedCartData.updatedItemPrice.toFixed(2);}
    
    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2);

    for (const badgeElement of cartBadgeElements) {
        badgeElement.textContent = responseData.updatedCartData.newCartQuantity;
    }
}

for (const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener("submit", cartItemUpdateFormSubmitHandler);
}