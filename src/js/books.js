import placeholderCover from '../assets/placeholder.svg';
import { isInCart, toggleCart } from './cart.js';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#039;');
}

function makeStars(rating) {
  const rounded = Math.round(Number(rating) || 0);
  return Array.from({ length: 5 }, (_, index) => (
    `<span class="rating__star ${index < rounded ? 'rating__star_active' : ''}">★</span>`
  )).join('');
}

function makePrice(saleInfo) {
  const price = saleInfo?.retailPrice;
  if (!price?.amount) return '';

  let formatted = `${price.amount} ${price.currencyCode || ''}`;
  try {
    formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: price.currencyCode || 'USD',
    }).format(price.amount);
  } catch {
    // Если API вернул неизвестный код валюты, оставляем простой формат.
  }

  return `<p class="book-card__price">${escapeHtml(formatted)}</p>`;
}

function makeRating(volumeInfo) {
  if (!volumeInfo?.averageRating) return '';

  const count = volumeInfo.ratingsCount
    ? `<span class="rating__count">${escapeHtml(volumeInfo.ratingsCount)} review</span>`
    : '';

  return `
    <div class="rating" aria-label="Rating ${escapeHtml(volumeInfo.averageRating)} out of 5">
      <span class="rating__stars">${makeStars(volumeInfo.averageRating)}</span>
      ${count}
    </div>
  `;
}

export function createBookCard(book) {
  const { volumeInfo = {}, saleInfo = {} } = book;
  const authors = Array.isArray(volumeInfo.authors) && volumeInfo.authors.length
    ? volumeInfo.authors.join(', ')
    : 'Unknown author';
  const cover = volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || placeholderCover;
  const title = volumeInfo.title || 'Untitled book';
  const description = volumeInfo.description || 'Description is not available for this book.';
  const inCart = isInCart(book.id);

  const article = document.createElement('article');
  article.className = 'book-card';
  article.innerHTML = `
    <div class="book-card__cover-wrap">
      <img class="book-card__cover" src="${escapeHtml(cover)}" alt="Cover of ${escapeHtml(title)}" loading="lazy">
    </div>
    <div class="book-card__content">
      <p class="book-card__authors">${escapeHtml(authors)}</p>
      <h2 class="book-card__title">${escapeHtml(title)}</h2>
      ${makeRating(volumeInfo)}
      <p class="book-card__description">${escapeHtml(description)}</p>
      ${makePrice(saleInfo)}
      <button class="buy-button ${inCart ? 'buy-button_in-cart' : ''}" type="button">
        ${inCart ? 'In the cart' : 'Buy now'}
      </button>
    </div>
  `;

  const button = article.querySelector('.buy-button');
  button.addEventListener('click', () => {
    const active = toggleCart({
      id: book.id,
      title,
      authors,
      cover,
    });

    button.classList.toggle('buy-button_in-cart', active);
    button.textContent = active ? 'In the cart' : 'Buy now';
  });

  return article;
}

export function renderBooks(books, container, append = false) {
  if (!append) {
    container.innerHTML = '';
  }

  const fragment = document.createDocumentFragment();
  books.forEach((book) => fragment.appendChild(createBookCard(book)));
  container.appendChild(fragment);
}
