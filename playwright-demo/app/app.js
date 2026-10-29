// Tony's Pizza: a tiny ordering app for learning Playwright.
// Plain JavaScript, no framework, so every step is easy to follow.

const cart = [];
let nextOrderNumber = 1001;

const menuList = document.getElementById('menu-list');
const menuStatus = document.getElementById('menu-status');
const special = document.getElementById('special');
const cartList = document.getElementById('cart-list');
const cartEmpty = document.getElementById('cart-empty');
const cartCount = document.querySelector('[data-testid="cart-count"]');
const cartTotal = document.querySelector('[data-testid="cart-total"]');
const checkoutButton = document.getElementById('checkout-button');

const views = {
  menu: document.getElementById('menu-view'),
  checkout: document.getElementById('checkout-view'),
  confirmation: document.getElementById('confirmation-view'),
};

function show(viewName) {
  for (const [name, view] of Object.entries(views)) {
    view.hidden = name !== viewName;
  }
}

async function loadMenu() {
  try {
    const response = await fetch('api/menu.json');
    if (!response.ok) throw new Error(`Menu request failed: ${response.status}`);
    const menu = await response.json();
    renderMenu(menu);
  } catch (error) {
    menuStatus.textContent = 'Sorry, the kitchen is closed. Please try again later.';
    menuStatus.setAttribute('role', 'alert');
  }
}

function renderMenu(menu) {
  menuStatus.hidden = true;
  special.textContent = `Today's special: ${menu.special.name}, $${menu.special.price}`;
  special.hidden = false;

  for (const pizza of menu.pizzas) {
    const item = document.createElement('li');
    item.innerHTML = `
      <div>
        <h3>${pizza.name}</h3>
        <p>${pizza.description}</p>
      </div>
      <span class="price">$${pizza.price}</span>
      <button type="button" aria-label="Add ${pizza.name}">Add</button>
    `;
    item.querySelector('button').addEventListener('click', () => addToCart(pizza));
    menuList.append(item);
  }
}

function addToCart(pizza) {
  cart.push(pizza);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = '';
  cart.forEach((pizza, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <span>${pizza.name}</span>
      <span>$${pizza.price}</span>
      <button type="button" aria-label="Remove ${pizza.name}">Remove</button>
    `;
    item.querySelector('button').addEventListener('click', () => removeFromCart(index));
    cartList.append(item);
  });

  const total = cart.reduce((sum, pizza) => sum + pizza.price, 0);
  cartCount.textContent = String(cart.length);
  cartTotal.textContent = `$${total}`;
  cartEmpty.hidden = cart.length > 0;
  checkoutButton.disabled = cart.length === 0;
}

checkoutButton.addEventListener('click', () => show('checkout'));
document.getElementById('back-button').addEventListener('click', () => show('menu'));

document.getElementById('checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const pizzas = cart.length === 1 ? '1 pizza' : `${cart.length} pizzas`;
  document.getElementById('confirmation-message').textContent =
    `Thanks, ${name}! Order #${nextOrderNumber} (${pizzas}) will arrive in about 30-40 minutes.`;
  nextOrderNumber += 1;
  show('confirmation');
});

document.getElementById('new-order-button').addEventListener('click', () => {
  cart.length = 0;
  renderCart();
  document.getElementById('checkout-form').reset();
  show('menu');
});

loadMenu();
