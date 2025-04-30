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