"use strict";

import { formatTitle, showError, updateCartCount } from "./main.js";

import { getCart, getCartTotal, removeFromCart, clearCart, } from "./cart.js";

//DOM ELEMENTS
const cartItemsContainer = document.getElementById("cart-items");
const paymentBtn = document.getElementById('proceed-to-payment');

//FUNCTIONS
function renderCartItems() {
  const cart = getCart();
  const cartTotalElement = document.getElementById("total-price");
  cartTotalElement.textContent = `$ ${getCartTotal().toFixed(2)}`;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="cart-message">Your bag is empty.</p>';
    return;
  }
  cartItemsContainer.innerHTML = "";

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const itemImage = document.createElement("img");
    itemImage.src = item.imageUrl;
    itemImage.alt = item.imageAlt;

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const itemTitle = document.createElement("p");
    itemTitle.textContent = formatTitle(item.title);

    const itemQuantity = document.createElement("p");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$ ${(item.discountedPrice * item.quantity).toFixed(2)}`;

    const removeButton = document.createElement("remove-button");
    removeButton.classList.add("remove-button");
    removeButton.type = "button";
    removeButton.dataset.productId = item.id;
    removeButton.textContent = "Remove";

    itemDetails.appendChild(itemTitle);
    itemDetails.appendChild(itemQuantity);
    itemDetails.appendChild(itemPrice);
    itemDetails.appendChild(removeButton);

    cartItem.appendChild(itemImage);
    cartItem.appendChild(itemDetails);
    cartItemsContainer.appendChild(cartItem);
  });
}

//EVENT LISTENERS

cartItemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".remove-button");
  if (!button) {
    return;
  }
  const productId = button.dataset.productId;
  removeFromCart(productId);
  renderCartItems();
  updateCartCount();
});

paymentBtn.addEventListener("click", (event) => {
  if (getCart().length === 0) {
    showError('Your bag is empty, please fill your shoppingbag');
    return;
  }
  paymentBtn.disabled = true;
  paymentBtn.textContent = "PLACING ORDER..."
  setTimeout(() => {
    clearCart();
    window.location.href = "confirmation/index.html";
  },
  2000);
});

//INITIAL LOAD
renderCartItems();
updateCartCount();
