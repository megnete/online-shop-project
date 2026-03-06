const addToCartButtonElements = document.querySelectorAll("#product-details button");
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart(event) {
    const productId = event.target.dataset.productid;
    const csrfToken = event.target.dataset.csrf;

    let response;
    try {
        response = await fetch("/cart/items", {
            method: "POST",
            body: JSON.stringify({ productId: productId, _csrf: csrfToken }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (error) {
        alert("Failed to add item to cart.");
        return;
    }

    if (!response.ok) {
        alert("Failed to add item to cart.");
        return;
    }

    const responseData = await response.json();
    const newTotalItems = responseData.newTotalItems;

    alert("Item added to cart successfully.");
    cartBadgeElement.textContent = newTotalItems;
}

addToCartButtonElements.forEach((button) => {
    button.addEventListener("click", addToCart);
});