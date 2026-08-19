const BASE_URL = 'http://localhost:8080/api';

export async function fetchProducts(featured = null) {
  let url = `${BASE_URL}/products`;
  if (featured !== null) {
    url += `?featured=${featured}`;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to load products');
  return response.json();
}

export async function fetchProduct(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Product not found');
  return response.json();
}

export async function fetchProductsByCategory(category) {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!response.ok) throw new Error('Category not found');
  return response.json();
}

export async function fetchCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to load categories');
  return response.json();
}

export async function fetchOffers() {
  const response = await fetch(`${BASE_URL}/offers`);
  if (!response.ok) throw new Error('Failed to load offers');
  return response.json();
}

export async function searchProducts(query) {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Search failed');
  return response.json();
}

export async function submitOrder(order) {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  if (!response.ok) throw new Error('Order submission failed');
  return response.json();
}

export async function fetchOrder(id) {
  const response = await fetch(`${BASE_URL}/orders/${id}`);
  if (!response.ok) throw new Error('Order not found');
  return response.json();
}

export async function fetchOrderByTracking(trackingNo) {
  const response = await fetch(`${BASE_URL}/orders/track/${trackingNo}`);
  if (!response.ok) throw new Error('Tracking ID not found');
  return response.json();
}

export async function submitContact(message) {
  const response = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
  if (!response.ok) throw new Error('Failed to send message');
  return response.json();
}

export function formatINR(price) {
  return '₹' + Math.round(price).toLocaleString('en-IN');
}
