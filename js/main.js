"use strict";

// --- IMPORTS ---
import { getCartCount } from "./cart.js";

// --- STATE ---
export const apiUrl = "https://v2.api.noroff.dev/rainy-days";

// --- FUNCTIONS ---
export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data from the API");
  }
  const json = await response.json();
  return json.data;
}

export function renderProducts(products, pathPrefix = "") {
  const productContainer = document.getElementById("products-container");
  productContainer.innerHTML = "";

  if (!products || products.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((product) => {
    const productCard = document.createElement("article");
    productCard.classList.add("product-card");

    const link = document.createElement("a");
    link.href = `${pathPrefix}product/index.html?id=${product.id}`;

    const image = document.createElement("img");
    image.src = product.image.url;
    image.alt = product.image.alt;

    const divText = document.createElement("div");
    divText.classList.add("name-price");

    const title = document.createElement("p");
    title.textContent = formatTitle(product.title);

    const price = document.createElement("p");
    price.textContent = "$ " + product.discountedPrice.toFixed(2);
    if (product.onSale === true) {
      price.classList.add("discounted-price");
      const saleTag = document.createElement("span");
      saleTag.textContent = "ON SALE";
      saleTag.classList.add("sale-tag");
      link.appendChild(saleTag);
    }

    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = "ADD TO BAG";
    addToCartButton.classList.add("cta", "add-to-cart-btn");
    addToCartButton.type = "button";
    addToCartButton.dataset.productId = product.id;

    productCard.appendChild(link);
    productCard.appendChild(addToCartButton);
    link.appendChild(image);
    link.appendChild(divText);
    divText.appendChild(title);
    divText.appendChild(price);
    productContainer.appendChild(productCard);
  });
}

export function formatTitle(title) {
  return title.replace("Rainy Days ", "");
}

export function showLoader() {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
}

export function showError(message) {
  const errorMessage = document.getElementById("message");
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

export function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (!cartCount) {
    return;
  }
  cartCount.textContent = getCartCount();
}

export function showToast(text) {
  const toast = document.createElement("div");
  toast.classList.add("toast", "overlay-card");
  toast.setAttribute("role", "status");
  toast.textContent = text;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// --- INITIAL LOAD ---
updateCartCount();
