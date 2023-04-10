// JavaScript код для добавления товара в корзину
const products = document.querySelectorAll(".product");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total");
const addToCartButton = document.querySelector(".add-to-cart");

let cart = [];

function addToCart(productName, productPrice) {
  let product = {
    name: productName,
    price: productPrice,
  };
  cart.push(product);
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let cartItem = document.createElement("li");
    cartItem.innerText = cart[i].name + " - $" + cart[i].price;
    cartItems.appendChild(cartItem);
    total += cart[i].price;
  }
  cartTotal.innerText = "Итого: $" + total;
}

products.forEach((product) => {
  let productName = product.querySelector("h2").innerText;
  let productPrice = Number(
    product.querySelector("p").innerText.replace("$", "")
  );
  addToCartButton.addEventListener("click", () => {
    addToCart(productName, productPrice);
    renderCart();
  });
});
