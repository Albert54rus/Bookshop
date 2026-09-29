import './styles/main.scss';
import { getBooks } from './js/api.js';
import { categories } from './js/categories.js';
import { renderBooks } from './js/books.js';
import { initSlider } from './js/slider.js';
import { updateCartBadge } from './js/cart.js';
import { PAGE_SIZE } from './js/config.js';

const categoriesList = document.getElementById('categories');
const booksContainer = document.getElementById('books');
const loadMoreButton = document.getElementById('load-more');
const status = document.getElementById('status');

let activeCategoryIndex = 0;
let startIndex = 0;
let loading = false;

function setStatus(message = '', type = '') {
  status.textContent = message;
  status.className = `status${type ? ` status_${type}` : ''}`;
}

function renderCategories() {
  categoriesList.innerHTML = '';

  categories.forEach((category, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');

    button.type = 'button';
    button.className = `categories__button${index === activeCategoryIndex ? ' categories__button_active' : ''}`;
    button.textContent = category.name;
    button.addEventListener('click', async () => {
      if (index === activeCategoryIndex || loading) return;

      activeCategoryIndex = index;
      startIndex = 0;
      renderCategories();
      await loadBooks(false);
    });

    item.appendChild(button);
    categoriesList.appendChild(item);
  });
}

async function loadBooks(append) {
  if (loading) return;

  loading = true;
  loadMoreButton.disabled = true;
  setStatus(append ? 'Loading more books…' : 'Loading books…');

  try {
    const category = categories[activeCategoryIndex];
    const books = await getBooks(category.query, startIndex);

    if (!books.length && !append) {
      renderBooks([], booksContainer, false);
      setStatus('No books found for this category.', 'message');
      loadMoreButton.hidden = true;
      return;
    }

    renderBooks(books, booksContainer, append);
    startIndex += books.length;
    setStatus('');
    loadMoreButton.hidden = books.length < PAGE_SIZE;
  } catch {
    setStatus(
      'Could not load books. Check the internet connection or add a Google Books API key in src/js/config.js.',
      'error',
    );
    loadMoreButton.hidden = false;
  } finally {
    loading = false;
    loadMoreButton.disabled = false;
  }
}

loadMoreButton.addEventListener('click', () => loadBooks(true));

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  updateCartBadge();
  renderCategories();
  loadBooks(false);
});
