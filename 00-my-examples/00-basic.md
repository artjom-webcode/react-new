# React: основы

## Оглавление

**Компоненты и JSX**

- [Вложенные компоненты](#вложенные-компоненты)
- [JavaScript внутри JSX](#javascript-внутри-jsx)
- [Логика внутри компонента](#логика-внутри-компонента)
- [Props](#props)

**Вывод данных**

- [Список из массива map и key](#список-из-массива-map-и-key)
- [Условный рендеринг](#условный-рендеринг)
- [Условные классы и текст](#условные-классы-и-текст)

**State и события**

- [useState](#usestate)
- [События onClick и onMouseEnter](#события-onclick-и-onmouseenter)
- [Derived state](#derived-state)

**Формы**

- [Список чисел в select](#список-чисел-в-select)
- [Обработка отправки формы](#обработка-отправки-формы)
- [Controlled elements](#controlled-elements)

**Передача данных между компонентами**

- [Lifting state up](#lifting-state-up)
- [Функция от ребёнка к родителю](#функция-от-ребёнка-к-родителю)

**Операции с массивом в state**

- [Три операции с массивом](#три-операции-с-массивом)
- [Сортировка списка](#сортировка-списка)

**Ещё не добавлено:** `useEffect`, `fetch` (loading и error), Context, Router, свои хуки, Supabase.

---

# Компоненты и JSX

## Вложенные компоненты

Один компонент можно использовать внутри другого, сколько угодно раз. Имя компонента всегда с большой буквы.

```jsx
function App() {
  return (
    <ul>
      <Item />
      <Item />
      <Item />
    </ul>
  );
}

function Item() {
  return <li>some item</li>;
}
```

---

## JavaScript внутри JSX

Любое JS-выражение вставляется в `{}`. Результат попадает прямо в разметку.

```jsx
function Footer() {
  return <footer>{new Date().toLocaleTimeString()} Hello I am footer</footer>;
}
```

---

## Логика внутри компонента

Компонент это обычная функция: до `return` можно писать любой JS (переменные, условия, расчёты).

```jsx
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;

  return <footer>{isOpen ? "We're open!" : "Sorry, we're closed"}</footer>;
}
```

---

## Props

Родитель передаёт данные через атрибуты, ребёнок получает их одним объектом.

```jsx
function Menu() {
  return (
    <Pizza
      name="Pizza Spinaci"
      ingredients="Tomato, mozzarella, spinach"
      price={10} // число передаём в {}, строку в кавычках
    />
  );
}

// Деструктуризация сразу в параметрах: видно, какие props ждёт компонент
function Pizza({ name, ingredients, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <span>{price + 3}</span>
    </div>
  );
}
```

**Как ломается:** props нельзя менять внутри ребёнка. Они идут только вниз, от родителя к ребёнку.

---

# Вывод данных

## Список из массива map и key

`map` превращает массив данных в массив компонентов. Каждому элементу нужен уникальный `key`.

```jsx
const pizzaData = [
  { name: "Focaccia", price: 6 },
  { name: "Margherita", price: 10 },
];

function App() {
  return (
    <ul>
      {pizzaData.map((pizza) => (
        <Pizza pizza={pizza} key={pizza.name} />
      ))}
    </ul>
  );
}

function Pizza({ pizza }) {
  return (
    <li>
      <h3>{pizza.name}</h3>
      <span>{pizza.price}</span>
    </li>
  );
}
```

**Как ломается:** без `key` React ругается в консоли. В качестве `key` берём `id` или что-то другое уникальное.

---

## Условный рендеринг

Показать или скрыть кусок JSX. Нет `else` → `&&`. Есть `else` → `? :`.

```jsx
function Menu({ pizzas }) {
  return (
    <main>
      {/* && : показать или ничего */}
      {pizzas.length > 0 && (
        <ul>
          {pizzas.map((pizza) => (
            <Pizza pizza={pizza} key={pizza.name} />
          ))}
        </ul>
      )}

      {/* ? : два варианта */}
      {pizzas.length > 0 ? <ul>{/* ... */}</ul> : <p>We're still working on our menu</p>}
    </main>
  );
}
```

**Как ломается:** `pizzas.length && ...` при пустом массиве выведет на странице `0`. Всегда сравнивай явно: `pizzas.length > 0 &&`.

**Почему не `if`:** в JSX внутри `{}` нужно выражение, а `if` это инструкция. `&&` и `? :` возвращают значение.

**Ранний выход:** если данных нет и считать нечего, можно вернуть сообщение сразу, до остального кода: `if (!items.length) return <p>Пусто</p>;`

---

## Условные классы и текст

Класс или текст можно менять по условию. Для классов удобен шаблонный литерал.

```jsx
function Pizza({ pizza }) {
  return (
    <li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
      <h3>{pizza.name}</h3>
      <span>{pizza.soldOut ? "Sold out" : pizza.price}</span>
    </li>
  );
}
```

Так же работают любые атрибуты: `disabled`, `title`, `style` и т.д.

---

# State и события

## useState

State это память компонента. `useState` возвращает текущее значение и функцию, которой его меняют. Каждый вызов этой функции заставляет React перерисовать компонент.

```jsx
import { useState } from "react";

function Counter() {
  // count: текущее значение, setCount: функция для его изменения, 0: начальное значение
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Схема: клик → `setCount` → новый state → компонент перерисовывается → на экране новое значение.

**Как ломается:**

- `count = count + 1` напрямую ничего не обновит на экране. Менять можно только через `setCount`.
- Если новое значение зависит от старого, надёжнее передавать функцию: `setCount((c) => c + 1)`.

---

## События onClick и onMouseEnter

Обработчик события это функция, которую React вызывает, когда событие произошло.

```jsx
function App() {
  function handleClick() {
    console.log("You clicked");
  }

  function handleMouseEnter() {
    console.log("Mouse is over the button");
  }

  return (
    <div>
      <button onClick={handleClick}>Click</button>
      <button onMouseEnter={handleMouseEnter}>Hover</button>
    </div>
  );
}
```

**Как ломается:**

- Функцию передаём **без скобок**: `onClick={handleClick}`. Если написать `onClick={handleClick()}`, она вызовется сразу при рендере, а не при клике.
- Если нужно передать аргумент, оборачиваем в стрелочную функцию: `onClick={() => handleClick(id)}`.

---

## Derived state

Если значение можно вычислить из другого state или props, отдельный `useState` для него не нужен. Просто считаем переменной прямо в теле компонента.

```jsx
function App() {
  const [numbers, setNumbers] = useState([10, 20]); // единственный state

  // derived state: пересчитывается при каждом рендере
  const count = numbers.length;
  const sum = numbers.reduce((acc, n) => acc + n, 0);

  return (
    <div>
      <button onClick={() => setNumbers([...numbers, 10])}>Добавить 10</button>
      <p>Чисел: {count}</p>
      <p>Сумма: {sum}</p>
    </div>
  );
}
```

Правило: «Можно ли получить это значение из того, что уже есть?» Да → переменная. Нет → `useState`.

**Как ломается:** если завести `useState` для `count` и `sum`, придётся обновлять их вручную рядом с `setNumbers`. Забудешь одну строку, и данные разойдутся.

---

# Формы

## Список чисел в select

`Array.from` создаёт массив чисел, `map` превращает его в `<option>`.

```jsx
<select>
  {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
    <option value={num} key={num}>
      {num}
    </option>
  ))}
</select>
```

`Array.from({ length: 20 }, ...)`: второй аргумент работает как `map`, `i` это индекс (с нуля), поэтому `i + 1`.

---

## Обработка отправки формы

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault(); // отключает перезагрузку страницы
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

- `onSubmit` вешаем на `<form>`, а не на кнопку: так форма отправляется и по клику, и по Enter.
- Функцию передаём **без скобок**. React вызовет её сам при событии и передаст объект события `e`.

**Как ломается:** без `e.preventDefault()` страница перезагружается, и всё введённое пропадает.

---

## Controlled elements

По умолчанию `input` и `select` хранят своё значение внутри DOM. В React мы забираем это себе: значение живёт в state, а не в HTML-элементе. Три шага: создать state → поставить его в `value` → обновлять в `onChange` через `e.target.value`.

```jsx
function Form() {
  // 1. Создаём state
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return; // защита: пустую форму не отправляем

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    // сбрасываем форму в начальное состояние
    setDescription("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        ...
      </select>

      <input
        type="text"
        value={description} // 2. Значение берём из state
        onChange={(e) => setDescription(e.target.value)} // 3. Обновляем state при вводе
      />
    </form>
  );
}
```

- Нужны и `value`, и `onChange`. Если указать только `value`, поле станет «замёрзшим»: печатать нельзя.
- Сброс формы после отправки это просто `setDescription("")`. Проще, чем в обычном JS, потому что форма всегда отражает state.
- Guard clause `if (!description) return;` в начале функции, чтобы пустое не отправлялось.
- `Date.now()` годится как быстрый id для учёбы. В реальных проектах id делает база или библиотека.

**Как ломается:**

- `e.target.value` всегда строка, даже у `select` с числами. Для числа оборачиваем: `Number(e.target.value)`.
- Только `value` без `onChange`: поле не печатается.

---

# Передача данных между компонентами

## Lifting state up

Проблема: `Form` создаёт новый элемент, а `PackingList` должен его показать. Они соседи, и props между ними не передать, потому что данные идут только вниз по дереву.

Решение: поднять state в ближайшего общего родителя (`App`) и передать детям через props. Для `Form` передаём ещё и функцию, которая этот state меняет.

```jsx
function App() {
  // state живёт в общем родителе
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
    </div>
  );
}

function Form({ onAddItems }) {
  // description и quantity: state формы, как в разделе про controlled elements
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem); // вызываем функцию из родителя
  }
  // ...
}

function PackingList({ items }) {
  // рендерим items из props
}
```

- **Lifting state up:** если state нужен нескольким соседним компонентам, переносим его в ближайшего общего родителя.
- **Данные вниз, события вверх:** state идёт вниз через props, а функция-обработчик тоже передаётся вниз как prop, и ребёнок вызывает её, чтобы сообщить родителю об изменении.
- Имя prop-функции по соглашению начинается с `on` (`onAddItems`), а сама функция в родителе с `handle` (`handleAddItems`). Так сразу видно, что где.
- Логика обновления state живёт там же, где сам state (в `App`), а `Form` только вызывает функцию.

**Как решать, где хранить state:**

1. Нужен только в одном компоненте → оставляем в нём.
2. Нужен ребёнку → передаём через props.
3. Нужен соседу → поднимаем к общему родителю.

---

## Функция от ребёнка к родителю

Когда событие происходит глубоко (клик по элементу списка), а state живёт в `App`, функцию передаём вниз по цепочке: `App` → `PackingList` → `Item`.

```jsx
function App() {
  const [items, setItems] = useState([]);

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return <PackingList items={items} onDeleteItem={handleDeleteItem} />;
}

function PackingList({ items, onDeleteItem }) {
  return (
    <ul>
      {items.map((item) => (
        <Item item={item} onDeleteItem={onDeleteItem} key={item.id} />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span>{item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
```

`PackingList` эта функция не нужна, но напрямую из `App` в `Item` передать нельзя, только по цепочке.

**Как ломается:**

- `onClick={onDeleteItem}`: React передаст объект события, а не `id`.
- `onClick={onDeleteItem(item.id)}`: функция вызовется сразу при рендере.
- Правильно: `onClick={() => onDeleteItem(item.id)}`.

---

# Операции с массивом в state

## Три операции с массивом

State нельзя мутировать. Вместо `push` и изменения на месте всегда создаём **новый** массив.

| Что сделать   | Как                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Добавить      | `setItems((items) => [...items, newItem])`                                                            |
| Удалить       | `setItems((items) => items.filter((item) => item.id !== id))`                                         |
| Изменить один | `setItems((items) => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))` |

Пример «изменить один» вместе с чекбоксом (чекбокс тоже controlled element, но через `checked`, а не `value`):

```jsx
function handleToggleItem(id) {
  setItems((items) =>
    items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)),
  );
}

function Item({ item, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" checked={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.description}</span>
    </li>
  );
}
```

**Как ломается:**

- `items.push(item)` мутирует state, и React это запрещает.
- Забыть `...item` при изменении: потеряешь остальные поля объекта.
- Для чекбокса указать `value` вместо `checked`.

---

## Сортировка списка

Сортировка это тоже derived state. В `useState` хранится только критерий (`sortBy`), а отсортированный список считается из исходного массива.

```jsx
const items = [
  { id: 1, name: "Socks", packed: true },
  { id: 2, name: "Charger", packed: false },
  { id: 3, name: "Axe", packed: false },
];

export default function App() {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "name") sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">По порядку добавления</option>
        <option value="name">По названию</option>
        <option value="packed">По статусу</option>
      </select>

      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            {item.name} {item.packed ? "✅" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- Строки сравниваем так: `a.name.localeCompare(b.name)`.
- Булевы значения: `Number(a.packed) - Number(b.packed)` (сначала `false`, потом `true`).

**Как ломается:** без `.slice()` метод `sort` **мутирует** исходный массив, и вернуть порядок «по добавлению» уже нельзя. Если `items` лежит в state, это ещё и мутация state.
