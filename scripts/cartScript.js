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

function addToCart(event) {
  event.preventDefault();

  const ramValue = document.querySelector("#ram-select").value;
  const colorValue = document.querySelector("#color-select").value;
  const storageValue = document.querySelector("#storage-select").value;

  console.log(ramValue, colorValue, storageValue);

  let product = {
    id: cart.length + 1,
    name: "Apple MacBook Air M1",
    price: 75000,
    color: colorValue,
    ram: ramValue,
    storage: storageValue,
  };
  cart.push(product);
  updateLocalStorage();
}

function deleteFromCart(cartId) {
  cart = cart.filter((cart) => cart.id !== cartId);
  calcSum();
  renderCart();
  updateLocalStorage();
}

function renderCart() {
  cartItems.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${item.name}</span>
            <span>${item.color}</span>
            <span>${item.ram} гб.</span>
            <span>${item.storage} гб.</span>
            <span>${item.price} руб.</span>
            <button class="icon-btn" onclick="deleteFromCart(${item.id})">
            Удалить
            </button>
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

function updateLocalStorage() {
  const cartString = JSON.stringify(cart);

  localStorage.setItem("cart", cartString);
}

function showFormData(event) {
  event.preventDefault();
  const form = event.target;
  console.log(event);
  const name = form.name.value;
  const phone = form.phone.value;

  // выводим данные в алерте
  alert(
    `Спасибо, ${name}!\nИтоговая сумма заказа: ${cartSum} руб\nС Вами свяжуться по номеру ${phone}`
  );
}
