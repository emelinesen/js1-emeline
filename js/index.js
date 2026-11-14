"use strict";

// --- STATE ---
import {
  fetchData,
  apiUrl,
  renderProducts,
  showError,
  showLoader,
  hideLoader,
  updateCartCount,
  showToast,
  formatTitle,
} from "./main.js";
import { addToCart } from "./cart.js";

let allProducts = [];

// --- DOM ELEMENTS ---
const productsContainer = document.getElementById("products-container");
const productFilter = document.getElementById("product-filter");

// --- FUNCTIONS ---
function showProducts(selectedGender, pathPrefix = "") {
  if (selectedGender && selectedGender !== "all") {
    const filteredProducts = allProducts.filter(
      (product) => product.gender === selectedGender,
    );
    renderProducts(filteredProducts, pathPrefix);
  } else {
    renderProducts(allProducts, pathPrefix);
  }
}

async function loadProducts() {
  showLoader();
  try {
    const products = await fetchData(apiUrl);
    allProducts = products;
    const selectedGender = productsContainer.dataset.gender;
    if (selectedGender) {
      showProducts(selectedGender, "../");
    } else {
      renderProducts(products);
    }
  } catch (error) {
    showError(
      "We have a problem with loading the products. Please try again later",
    );
  } finally {
    hideLoader();
  }
}

// --- EVENT LISTENERS ---

productsContainer.addEventListener("click", (event) => {
  const button = event.target.closest(".add-to-cart-btn");
  if (!button) {
    return;
  }
  const productId = button.dataset.productId;
  const product = allProducts.find((item) => item.id === productId);
  addToCart(product);
  updateCartCount();
  showToast(`${formatTitle(product.title)} added!`);
});

if (productFilter) {
  productFilter.addEventListener("change", (event) => {
    showProducts(event.target.value);
  });
}

// --- INITIAL LOAD ---

loadProducts();
updateCartCount();
