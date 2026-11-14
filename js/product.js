'use strict';

import { 
  fetchData, 
  apiUrl, 
  formatTitle,
  showError,
  showLoader, 
  hideLoader, 
  updateCartCount,
  showToast,
} from './main.js';

import {
  addToCart,

 } from './cart.js';

let currentProduct = null;
const productId = new URLSearchParams(window.location.search).get('id');

function renderProduct(product) {
  const productName = document.getElementById('product-name');
  productName.textContent = formatTitle(product.title);

  const productImage = document.getElementById('product-image');
  productImage.src = product.image.url;
  productImage.alt = product.image.alt;

  const productDescription = document.getElementById('product-description');
  productDescription.textContent = product.description;
  
  const productSizes = document.getElementById('size-options');
  productSizes.textContent = 'Available sizes: ' + product.sizes.join(', ');


  const productPrice = document.getElementById('product-price');
  productPrice.textContent = '$ ' + product.discountedPrice.toFixed(2);
  if (product.onSale === true) {
    productPrice.classList.add('discounted-price');
    const oldPrice = product.price.toFixed(2);
    const oldPriceElement = document.createElement('span');
    oldPriceElement.textContent = '$ ' + oldPrice;
    oldPriceElement.classList.add('old-price');
    productPrice.appendChild(oldPriceElement);
  }

  
  const addToCartButton = document.getElementById('cta');
  addToCartButton.dataset.productId = product.id; 

  document.title = formatTitle(product.title) + ' | Rainy Days';
  document.getElementById('breadcrumb').textContent = formatTitle(product.title) ;
  document.getElementById('product-container').classList.remove('hidden');
}

async function loadProduct() {
  showLoader();
  try {
    const product = await fetchData(`${apiUrl}/${productId}`);
    currentProduct = product;
    renderProduct(product);
  } catch (error) {
    showError('Oops! We have a problem with loading the product.');
  } finally {
    hideLoader();
  }
}

if (!productId) {
  showError('No product is chosen. Please go back to the product list and select a product.');
} else {
  loadProduct();
}

const addToCartButton = document.getElementById('cta');
addToCartButton.addEventListener('click', (event) => {
    addToCart(currentProduct);
    updateCartCount();
    showToast(`${formatTitle(currentProduct.title)} added!`);
    });


updateCartCount();