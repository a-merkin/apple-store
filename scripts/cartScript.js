// Добавление товара в корзину
const products = document.querySelectorAll(".product");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".total");
const addToCartButton = document.querySelector(".add-to-cart");
const deliveryButtons = document.getElementsByName("delivery");

let cart = [];
let cartSum = 0;

getLocalStorage();
renderCart();
calcSum();

deliveryButtons.forEach((button) => {
  button.addEventListener("change", () => {
    if (button.checked) {
      cartSum += Number(button.value);
    }
    renderSum();
  });
});

function addToCart(productName, productPrice) {
  let product = {
    name: productName,
    price: productPrice,
  };
  cart.push(product);

  const cartString = JSON.stringify(cart);

  localStorage.setItem("cart", cartString);
}

function renderCart() {
  // очищаем список
  cartItems.innerHTML = "";
  // проходимся по всем товарам в корзине и добавляем их в список
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} руб.</span>
          `;
    cartItems.appendChild(li);
  });
}

function calcSum() {
  cartSum = cart.reduce(
    (accumulator, item) => accumulator + Number(item.price),
    cartSum
  );
  renderSum();
}

function renderSum() {
  const total = document.querySelector(".total-price");
  total.innerHTML = `${cartSum} руб`;
}

function getLocalStorage() {
  const cartString = localStorage.getItem("cart");

  if (JSON.parse(cartString)) cart = JSON.parse(cartString);
}
