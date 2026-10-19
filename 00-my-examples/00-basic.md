# React: основы

## Оглавление

- [Вложенные компоненты](#вложенные-компоненты)
- [JavaScript внутри JSX](#javascript-внутри-jsx)
- [Логика внутри компонента](#логика-внутри-компонента)
- [Props: передача данных в компонент](#props-передача-данных-в-компонент)
- [Список из массива: map и key](#список-из-массива-map-и-key)
- [Условный рендеринг: показать или скрыть](#условный-рендеринг-показать-или-скрыть) (`&&` и `? :`)
- [Условные классы и текст](#условные-классы-и-текст)
- [Форма: список чисел в select](#форма-список-чисел-в-select)
- [Форма: обработка отправки](#форма-обработка-отправки)

---

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
  // {} внутри JSX: тут выполняется обычный JavaScript
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

## Props: передача данных в компонент

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

## Список из массива: map и key

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

## Условный рендеринг: показать или скрыть

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

## Форма: список чисел в select

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

## Форма: обработка отправки

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault(); // отключает перезагрузку страницы
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
```

- `onSubmit` вешаем на `<form>`, а не на кнопку: так форма отправляется и по клику, и по Enter.
- Функцию передаём **без скобок** (`handleSubmit`, не `handleSubmit()`). React вызовет её сам при событии.
- React передаёт в функцию объект события `e`.

**Как ломается:** без `e.preventDefault()` страница перезагружается, и всё введённое пропадает.
