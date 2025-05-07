export const getOrCreateCartId = async () => {
    let cartId = localStorage.getItem("cartId")
    if (!cartId) {
        const res = await fetch("http://localhost:8080/cart", {
            method: "POST",
        })

        if (!res.ok) {
            throw new Error("Failed to create a new cart")
        }

        const data = await res.json()
        cartId = data.id
        localStorage.setItem("cartId", cartId)
    }
    return cartId
}

export async function addToCart(productId, quantity = 1) {
    try {
        const cartId = await getOrCreateCartId();

        const res = await fetch(`http://localhost:8080/cart/${cartId}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Failed to add to cart");
        }

        const cartRes = await fetch(`http://localhost:8080/cart/${cartId}`);
        const cartData = await cartRes.json();

        const newCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cartCount", newCount);
        window.dispatchEvent(new Event("cartCountUpdated"));

        return "Added to cart!";
    } catch (error) {
        throw new Error(error.message);
    }
}