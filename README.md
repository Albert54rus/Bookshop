# Bookshop — SkillFactory, модуль 47

Учебный проект книжного интернет-магазина по макету из задания.

## Реализовано

- фиксированная шапка с логотипом, навигацией и иконками;
- бейдж количества книг в корзине;
- слайдер из 3 изображений, автопереключение каждые 5 секунд и ручное переключение точками;
- список категорий с визуальным выделением активной категории;
- загрузка книг из Google Books API по выбранной категории;
- ленивое добавление по 6 книг через кнопку `Load more`;
- карточки с обложкой/плейсхолдером, авторами, названием, рейтингом, отзывами, описанием и ценой;
- описание ограничено тремя строками;
- кнопка `Buy now` / `In the cart`;
- сохранение корзины в `localStorage`;
- модульная структура JavaScript;
- Sass;
- Webpack;
- минификация CSS и JS в production-сборке;
- ESLint;
- адаптивная вёрстка;
- изображения слайдера импортируются как Webpack assets и попадают в production-сборку.

## Google Books API

В `src/js/config.js` есть константа `API_KEY`.

```js
export const API_KEY = '';
```

По ТЗ курса запросы должны выполняться с Google Books API key. Перед финальной проверкой вставьте свой ключ между кавычками. Код не хранит готовый чужой ключ в репозитории. Для публичного GitHub лучше использовать ключ с ограничением по HTTP referrer и доступом только к Books API.

## Запуск

```bash
npm install
npm start
```

Production-сборка:

```bash
npm run build
```

Проверка кода:

```bash
npm run lint
```

## Структура

```text
src/
  assets/
  js/
    api.js
    books.js
    cart.js
    categories.js
    config.js
    slider.js
  styles/
    main.scss
  index.html
  index.js
webpack.config.js
package.json
package-lock.json
```

## Соответствие техническим требованиям

- SPA: категории, книги, слайдер и корзина работают без перезагрузки страницы.
- JavaScript разбит на ES6-модули.
- В проекте есть `package.json`, `package-lock.json` и скрипт `npm run build`.
- Webpack собирает JS и Sass; CSS выносится в отдельный файл через `MiniCssExtractPlugin`.
- Production-сборка минифицирует JS стандартным minimizer Webpack и CSS через `CssMinimizerPlugin`.
- Дополнительные инструменты оптимизации: Sass, ESLint, BEM-именование классов и Webpack Dev Server.
- `node_modules` и `dist` исключены через `.gitignore`.
- В стилях не используются селекторы по HTML-тегам и id: оформление задаётся через классы.

## Перед сдачей

1. Вставить свой Google Books API key в `src/js/config.js`.
2. Выполнить `npm install`. Это также автоматически актуализирует `package-lock.json`.
3. Выполнить `npm run lint`.
4. Выполнить `npm run build` и убедиться, что сборка завершается без ошибок.
5. Выполнить `npm start` и вручную проверить категории, `Load more`, слайдер, корзину и сохранение корзины после перезагрузки.
6. Не добавлять `node_modules` и `dist` в GitHub.
