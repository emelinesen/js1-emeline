'use strict';

// --- STATE ---
// data, like the list of all games
// and the current state of pagination and filters.

export const apiUrl = 'https://v2.api.noroff.dev/rainy-days';



// --- DOM ELEMENTS ---
// This is where we will select the elements from the HTML that we need to
// interact with, like containers and buttons.

// --- FUNCTIONS ---
// This is where we will write all our functions: for fetching data,
// rendering games, handling search, pagination, etc.
export async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data from the API');
  }
  const json = await response.json();
  return json.data;
}
export const productData = await fetchData(apiUrl)

export function renderProducts(products) {
  const productContainer = document.getElementById('products-container');
  productContainer.innerHTML = '';

  if (!products || products.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach(product => {
    const productCard = document.createElement('article');
    productCard.classList.add('product-card');

    const link = document.createElement('a');
    link.href = `product/index.html?id=${product.id}`;
   

    const image = document.createElement('img');
    image.src = product.image.url;
    image.alt = product.image.alt;

    const divText = document.createElement('div');
    divText.classList.add('name-price');

    const title = document.createElement('p');
    title.textContent = formatTitle(product.title);

    const price = document.createElement('p');
    price.textContent =  '$ ' + product.discountedPrice.toFixed(2);

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'ADD TO BAG';
    addToCartButton.classList.add('cta');
    addToCartButton.type = 'button';
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
  return title.replace('Rainy Days ', '');
}
// --- EVENT LISTENERS ---
// This is where we will add our event listeners, for example, for the
// search input or pagination buttons.

// --- INITIAL LOAD ---
// This is where we will call the initial function to fetch the data
// and render the page for the first time.

