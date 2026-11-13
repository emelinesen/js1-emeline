'use strict';

const cartKey = 'cart';
export function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

export function getCart() {
  const cart = localStorage.getItem(cartKey);
  let savedCart = [];
  if (cart) {
    savedCart = JSON.parse(cart);
  }
  return savedCart;
}

export function addToCart (product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: product.id, title: product.title, discountedPrice: product.discountedPrice, imageUrl: product.image.url, imageAlt: product.image.alt, quantity: 1 });
  }
  saveCart(cart);
}

export function getCartCount() {
  let total = 0;
  getCart().forEach(item => {
    total += item.quantity;
  });
  return total;
}

export function getCartTotal() {
  let cartTotal = 0;
  getCart().forEach(item => {
    cartTotal += item.discountedPrice * item.quantity;
  });
  return cartTotal;
}

export function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id !== productId);
  saveCart(updatedCart)
}

export function clearCart() {
saveCart([]);
}
// --- STATE ---
// This is where we will store the application's data, like the list of all games
// and the current state of pagination and filters.

// --- DOM ELEMENTS ---
// This is where we will select the elements from the HTML that we need to
// interact with, like containers and buttons.

// --- FUNCTIONS ---
// This is where we will write all our functions: for fetching data,
// rendering games, handling search, pagination, etc.

// --- EVENT LISTENERS ---
// This is where we will add our event listeners, for example, for the
// search input or pagination buttons.

// --- INITIAL LOAD ---
// This is where we will call the initial function to fetch the data
// and render the page for the first time.