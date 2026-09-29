import { API_KEY, PAGE_SIZE } from './config.js';

const API_URL = 'https://www.googleapis.com/books/v1/volumes';

export async function getBooks(query, startIndex = 0) {
  const params = new URLSearchParams({
    q: query,
    printType: 'books',
    startIndex: String(startIndex),
    maxResults: String(PAGE_SIZE),
    langRestrict: 'en',
  });

  if (API_KEY.trim()) {
    params.set('key', API_KEY.trim());
  }

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Google Books API: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data.items) ? data.items : [];
}
