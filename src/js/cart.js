const STORAGE_KEY = 'bookshop-cart';

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

let cart = readCart();

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function isInCart(bookId) {
  return cart.some((book) => book.id === bookId);
}

export function toggleCart(book) {
  if (isInCart(book.id)) {
    cart = cart.filter((item) => item.id !== book.id);
  } else {
    cart.push(book);
  }

  saveCart();
  updateCartBadge();
  return isInCart(book.id);
}

export function updateCartBadge() {
  const badge = document.getElementById('cart-badge');

  if (!badge) return;

  badge.textContent = String(cart.length);
  badge.hidden = cart.length === 0;
}
