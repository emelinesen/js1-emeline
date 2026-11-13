'use strict';

// --- STATE ---
// This is where we will store the application's data, like the list of all games
// and the current state of pagination and filters.
import { 
  fetchData, 
  apiUrl, 
  renderProducts, 
  showError,
  showLoader, 
  hideLoader, 
  updateCartCount,
} from './main.js';
import { 
  addToCart,
 } from './cart.js';

 let allProducts = [];
 

// --- DOM ELEMENTS ---
// This is where we will select the elements from the HTML that we need to
// interact with, like containers and buttons.
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('message');
const productsContainer = document.getElementById('products-container');
const productFilter = document.getElementById('product-filter');

// --- FUNCTIONS ---
// This is where we will write all our functions: for fetching data,
// rendering games, handling search, pagination, etc
function showProducts(selectedGender, pathPrefix = '') {
  if (selectedGender && selectedGender !== 'all') {
    const filteredProducts = allProducts.filter((product) => product.gender === selectedGender);
    renderProducts(filteredProducts, pathPrefix)
    }else {
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
      showProducts(selectedGender, '../')
    }else {
    renderProducts(products);
    }
  } catch (error) {
    showError('We have a problem with loading the products. Please try again later');
  } finally {
    hideLoader();
  }
}



// --- EVENT LISTENERS ---
// This is where we will add our event listeners, for example, for the
// search input or pagination buttons.
productsContainer.addEventListener('click', (event) => {
  const button = event.target.closest('.add-to-cart-btn');
  if (!button) {
    return;
    }
  const productId = button.dataset.productId;
  const product = allProducts.find(item => item.id === productId);
  addToCart(product);
  updateCartCount();
});


if (productFilter) {
    productFilter.addEventListener( 'change', (event) => {
    showProducts(event.target.value);
  } );
}

// --- INITIAL LOAD ---
// This is where we will call the initial function to fetch the data
// and render the page for the first time.
loadProducts();
updateCartCount();
