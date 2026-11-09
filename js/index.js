'use strict';

// --- STATE ---
// This is where we will store the application's data, like the list of all games
// and the current state of pagination and filters.
import { fetchData, apiUrl, productData, renderProducts } from './main.js';

// --- DOM ELEMENTS ---
// This is where we will select the elements from the HTML that we need to
// interact with, like containers and buttons.

// --- FUNCTIONS ---
// This is where we will write all our functions: for fetching data,
// rendering games, handling search, pagination, etc
async function loadProducts() {
  await fetchData(apiUrl);
  console.log('products loaded:' + productData);
}



// --- EVENT LISTENERS ---
// This is where we will add our event listeners, for example, for the
// search input or pagination buttons.

// --- INITIAL LOAD ---
// This is where we will call the initial function to fetch the data
// and render the page for the first time.
loadProducts();
renderProducts(productData);