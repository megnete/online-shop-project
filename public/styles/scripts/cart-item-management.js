const cartItemUpdateFormElements = document.querySelectorAll(".cart-item-management");

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
}  // moved closing brace to here

for (const formElement of cartItemUpdateFormElements) {
    formElement.addEventListener("submit", cartItemUpdateFormSubmitHandler);
}