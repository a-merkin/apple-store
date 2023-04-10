renderCartCount();
// Роутинг
function loadPage(url) {
  document.getElementById("content-frame").src = url;
}

function renderCartCount() {
  const cartCount = document.querySelector(".cart-count");
  cartCount.innerHTML = "";

  let cart = [];
  const cartString = localStorage.getItem("cart");

  if (JSON.parse(cartString)) cart = JSON.parse(cartString);

  cartCount.innerHTML = `${cart.length}`;

}
