# Section 5 — Working With Components, Props, and JSX

## 📑 Оглавление

- [💡 Логика внутри компонентов](#-логика-внутри-компонентов-js-before-jsx)
- [🎨 Стилизация в React](#-стилизация-в-react)
- [⚠️ Правила и грабли JSX](#️-правила-и-грабли-jsx)
- [📦 Props](#-props-в-react)
- [🧠 Главное](#-главное)

# Логика внутри компонентов (JS before JSX)

---

```jsx
function Footer() {
  // 1. Подготавливаем данные
  const hour = new Date().getHours();

  const openHour = 12;
  const closeHour = 22;

  // 2. Вычисляем значение
  const isOpen = hour >= openHour && hour <= closeHour;

  // 3. Используем готовые данные в JSX
  return (
    <footer>
      {new Date().toLocaleTimeString()} — Мы сейчас {isOpen ? "открыты" : "закрыты"}
    </footer>
  );
}
```

**React-компонент — это обычная JavaScript-функция.**
Всё, что находится **до `return`**, — это подготовка данных и логика.
Всё, что находится **внутри `return`**, — это JSX, то есть описание UI.
Компонент выполняется заново при каждом рендере.

# Стилизация в React

---

### Способ 1 — Inline Styles

В React `style` принимает **JavaScript-объект**, а не строку.

#### Вариант 1 — прямо в JSX

```jsx
<h1
  style={{
    color: "red",
    fontSize: "48px",
    textTransform: "uppercase",
  }}
>
  Hello React!
</h1>
```

Здесь две пары `{}`:

```jsx
style={{ ... }}
```

- первые `{}` → переход в JavaScript
- вторые `{}` → JavaScript-объект

#### Вариант 2 — через переменную

Более удобно при большом количестве стилей:

```jsx
const headerStyle = {
  color: "red",
  fontSize: "48px",
  textTransform: "uppercase",
};

<h1 style={headerStyle}>Hello React!</h1>;
```

### Способ 2 — Внешний CSS

Можно использовать обычный CSS-файл:

```jsx
import "./index.css";
```

После этого классы из CSS можно использовать в JSX:

```jsx
function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Fast React Pizza Co.</h1>
      </header>
    </div>
  );
}
```

CSS:

```css
.container {
  max-width: 1200px;
}

.header {
  background-color: #f5f5f5;
}
```

#### Важно

Обычный CSS, подключённый таким образом, является **глобальным**.

То есть:

```jsx
import "./index.css";
```

# 📦 Props в React

---

```jsx
function Pizza(props) {
  console.log(props);

  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <img src={props.photoName} alt={props.name} />
      <span>{props.price}</span>
    </div>
  );
}

<Pizza
  name="Spinaci"
  ingredients="Tomato, spinach"
  price={10}
/>

<Pizza
  name="Funghi"
  ingredients="Tomato, mushrooms"
  price={12}
/>
```

- Дочерний компонент получает `props` в качестве параметра.
- Props передаются при использовании компонента как атрибуты.
- Один компонент → множество уникальных экземпляров.
- `props` — это обычный **JavaScript-объект**.
- Каждый экземпляр компонента может получать **свои значения**.
- Props передаются только **сверху вниз**: `Parent → Child`.
- Props используются, чтобы сделать компонент **переиспользуемым**.
- Числа передаются через `{}`:

  ```jsx
  price={10}
  ```

- Строки можно передавать напрямую:

  ```jsx
  name = "Spinaci";
  ```

- В дочернем компоненте данные доступны через:

  ```jsx
  props.name;
  props.price;
  props.ingredients;
  ```

### Ментальная модель

```text
Parent
   ↓
 props
   ↓
Child
```

**Props = данные, которые родитель передаёт дочернему компоненту.**

# 🔀 Conditional Rendering в React

---

```jsx
function Footer() {
  const isOpen = true;

  return <footer>{isOpen && <p>We're open!</p>}</footer>;
}
```

**Conditional Rendering** — это отображение UI в зависимости от определённого условия.
`&&` для условного рендеринга

```jsx
{
  isOpen && (
    <div className="order">
      <p>We're open until {closeHour}:00.</p>
      <p>Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}
```

Можно показывать целый блок JSX
`&&` может условно отображать не только один элемент, но и **целую группу JSX**.
Скобки `()` здесь позволяют удобно записать многострочный JSX.
Важно **Логику вычисления условия** лучше делать до `return`, а в JSX оставлять сам рендеринг.

- **Conditional Rendering** — отображение UI в зависимости от условия.
- `{condition && <Component />}` — показать компонент, если условие `true`.
- `&&` работает через **short-circuiting**.
- `&&` работает с **truthy / falsy**, а не только с boolean.
- `[]` — `truthy`, поэтому `pizzas && ...` не проверяет пустой массив.
- `0` — особая ловушка: React отображает `0`.
- Лучше писать `{numPizzas > 0 && <PizzaList />}`.
- `&&` → **показать / ничего**.
- `? :` → **вариант A / вариант B**.

# 🔀 Conditional Rendering — Multiple Returns

## 💡 Главная идея

Третий способ условного рендеринга — использовать **несколько `return`** внутри компонента.

До этого мы обычно писали один `return`:

```jsx id="v4i6fy"
function Footer() {
  return <footer>...</footer>;
}
```

Но компонент может иметь несколько `return`, если они находятся внутри разных условий.

Например:

```jsx id="0c9e3v"
function Footer() {
  if (!isOpen) {
    return <p>Sorry, we're closed.</p>;
  }

  return <footer>We're open!</footer>;
}
```

Здесь компонент всё равно вернёт **только один результат**.

---

# 1. Early Return

Такой подход называется **Early Return** — досрочный возврат.

Сначала проверяем условие:

```jsx id="hlb0kw"
if (!isOpen) {
  return <p>Sorry, we're closed.</p>;
}
```

Если условие `true`, функция сразу заканчивается.

Всё, что находится после этого `return`, **не выполняется**.

Если условие `false`, JavaScript продолжает выполнение и доходит до обычного `return`:

```jsx id="n9u3f9"
return <footer>We're open!</footer>;
```

Ментальная модель:

```text id="2v83y7"
Компонент
   ↓
if (условие)
   ↓
return
   ↓
компонент заканчивается

если условие false
   ↓
продолжаем выполнение
   ↓
обычный return
```

---

# 2. Два `return` одновременно не выполняются

Важно понимать:

```jsx id="9j0fkn"
if (!isOpen) {
  return <p>We're closed.</p>;
}

return <footer>We're open!</footer>;
```

не означает, что React получит два элемента.

Выполнится **только один** из `return`.

Если:

```js id="q5xup0"
isOpen === false;
```

сработает первый:

```jsx id="9esqmc"
return <p>We're closed.</p>;
```

и функция завершится.

Если:

```js id="xv08it"
isOpen === true;
```

первый `return` пропускается и выполняется второй:

```jsx id="mcrb8u"
return <footer>We're open!</footer>;
```

---

# ⚠️ 3. Важный нюанс с JSX-структурой

Представим:

```jsx id="fpt4im"
function Footer() {
  if (!isOpen) {
    return <p>We're closed.</p>;
  }

  return <footer>We're open!</footer>;
}
```

Когда ресторан закрыт, компонент возвращает только:

```jsx id="7c3khl"
<p>We're closed.</p>
```

`<footer>` в этом случае вообще не существует.

Если нам нужно, чтобы `<footer>` присутствовал **в обоих случаях**, такой подход становится менее удобным:

```jsx id="yg8gta"
if (!isOpen) {
  return (
    <footer>
      <p>We're closed.</p>
    </footer>
  );
}

return (
  <footer>
    <p>We're open!</p>
  </footer>
);
```

Получается дублирование JSX.

Поэтому Early Return обычно лучше использовать, когда нужно вернуть **что-то целиком другое**, а не просто изменить небольшой кусок существующего JSX.

---

# 4. Когда Early Return особенно полезен?

Early Return очень хорошо подходит, когда нужно условно отрендерить **целый компонент**.

Например, есть компонент `Pizza`.

Каждая пицца получает через props объект с данными:

```jsx id="v5u8pu"
function Pizza(props) {
  ...
}
```

В объекте есть:

```js id="a3dfq4"
props.pizza.soldOut;
```

Это boolean, который показывает, закончилась ли пицца.

Можно написать:

```jsx id="1qiykk"
function Pizza(props) {
  if (props.pizza.soldOut) {
    return null;
  }

  return <li className="pizza">...</li>;
}
```

---

# 5. `return null`

Особенно важный паттерн:

```jsx id="pssqu4"
if (props.pizza.soldOut) {
  return null;
}
```

`null` означает:

> **Ничего не рендерить.**

Поэтому если:

```js id="ub4okp"
props.pizza.soldOut === true;
```

компонент вообще ничего не отображает.

Если:

```js id="h1c0i8"
props.pizza.soldOut === false;
```

выполнение продолжается:

```jsx id="c1b6bv"
return <li>...</li>;
```

и пицца отображается.

---

# 6. Почему это удобно?

Допустим, у нас есть список:

```text id="a1eqwl"
Margherita
Funghi
Salamino
Prosciutto
```

И у `Salamino`:

```js id="7x1rmg"
soldOut: true;
```

Тогда:

```jsx id="q99hnb"
if (props.pizza.soldOut) {
  return null;
}
```

полностью убирает эту пиццу из UI.

Получаем:

```text id="5w77h3"
Margherita
Funghi
Prosciutto
```

`Salamino` не отображается.

---

# 7. Early Return может вернуть не только `null`

Условный `return` может вернуть любой JSX.

Например:

```jsx id="4sxg9n"
if (props.pizza.soldOut) {
  return <h2>Pizza is sold out</h2>;
}
```

Технически это работает.

Но важно, что в реальном приложении это должно иметь смысл.

Можно вернуть:

- `null` → ничего
- JSX → другой UI
- другой компонент

Например:

```jsx id="23a8nl"
if (!isLoggedIn) {
  return <Login />;
}
```

---

# 🆚 8. Когда использовать Early Return?

Early Return особенно полезен, когда нужно:

### Вернуть вообще другой UI

```jsx id="6l9ijx"
if (!isLoggedIn) {
  return <Login />;
}
```

### Ничего не отображать

```jsx id="4zz11p"
if (soldOut) {
  return null;
}
```

### Прекратить выполнение компонента

```jsx id="2r6w7v"
if (!data) {
  return <Loading />;
}
```

---

# 🔀 Сравнение трёх способов Conditional Rendering

В React есть несколько основных способов условного рендеринга.

## 1. `&&`

Используем, когда нужно:

> **показать что-то или ничего**

```jsx id="44a2wi"
{
  isOpen && <Order />;
}
```

```text id="a1ef89"
true  → <Order />
false → ничего
```

---

## 2. Ternary Operator

Используем, когда нужны **два разных варианта**:

```jsx id="7t9d1w"
{
  isOpen ? <Order /> : <Closed />;
}
```

```text id="xjkr81"
true  → <Order />
false → <Closed />
```

---

## 3. Early Return

Используем, когда нужно изменить **весь результат компонента**:

```jsx id="b8n1cv"
function Pizza({ pizza }) {
  if (pizza.soldOut) {
    return null;
  }

  return <PizzaItem pizza={pizza} />;
}
```

```text id="9v3qg0"
soldOut
   ↓
 true → null
 false → Pizza
```

---

# 🧠 Главное

### 1. Компонент может иметь несколько `return`

```jsx id="i3f3af"
function Component() {
  if (condition) {
    return <A />;
  }

  return <B />;
}
```

Но за один запуск функции выполнится только **один** `return`.

---

### 2. Early Return завершает функцию

```jsx id="17d0pp"
if (condition) {
  return <Something />;
}

// Этот код не выполнится,
// если condition === true
```

---

### 3. `return null` = ничего не отображать

```jsx id="l1d2ir"
if (soldOut) {
  return null;
}
```

Это очень распространённый способ полностью скрыть компонент.

---

### 4. Early Return лучше подходит для целого компонента

Если нужно условно показать **маленькую часть JSX**, обычно удобнее:

```jsx id="j54kgv"
{
  condition && <Component />;
}
```

или:

```jsx id="o8l5b5"
{
  condition ? <A /> : <B />;
}
```

Если нужно определить, **что компонент вообще должен вернуть**, удобно использовать Early Return:

```jsx id="7m3jcr"
if (condition) {
  return <Something />;
}
```

---

# 🎯 Как выбрать способ?

```text id="t7i8xj"
Нужно показать JSX или ничего?
        ↓
       &&

Нужно выбрать между A и B?
        ↓
     Ternary

Нужно вернуть полностью другой UI
или вообще ничего из компонента?
        ↓
   Early Return
```

### Простая формула

> **`&&` → показать / не показать**

> **`? :` → вариант A / вариант B**

> **Early Return → определить, что вообще вернёт компонент**

И главное: выбор способа зависит от ситуации. Чем больше практики, тем легче будет автоматически понимать, какой вариант здесь наиболее подходящий.

# 🔀 Conditional Rendering — Conditional Text & Class Names

## 💡 Главная идея

До этого мы учились условно отображать **целые элементы или компоненты**.

Теперь задача немного другая:

> **Элемент всегда существует, но его содержимое или CSS-класс зависит от условия.**

Например, у нас всегда есть `<span>` с ценой, но:

```text id="2v5ypu"
обычная пицца → 10 €
пицца sold out → SOLD OUT
```

И сама пицца:

```text id="v7b9y7"
обычная → обычный вид
sold out → серый вид
```

Для этого особенно удобно использовать **тернарный оператор**.

---

# 1. Условный текст внутри элемента

Представим, что у нас всегда должен существовать `<span>`:

```jsx id="q5emjz"
<span></span>
```

Но его содержимое зависит от `pizza.soldOut`.

Используем тернарный оператор:

```jsx id="c4m08k"
<span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
```

Логика:

```text id="1c9n6h"
pizza.soldOut
      ↓
   true?
   /   \
  да    нет
  ↓      ↓
"SOLD OUT" price
```

---

# 2. Почему это лучше, чем условно создавать сам элемент?

Можно было бы сделать так:

```jsx id="z9x3kr"
{
  !pizza.soldOut ? <span>{pizza.price}</span> : <span>SOLD OUT</span>;
}
```

Это тоже работает.

Но здесь мы фактически создаём **два разных `<span>`**, хотя нам на самом деле нужен один и тот же элемент.

Более чистый вариант:

```jsx id="6d5h2v"
<span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
```

### Разница

**Условный элемент:**

```jsx id="j3rj9v"
condition ? <span>A</span> : <span>B</span>;
```

Мы выбираем:

> какой элемент создать.

**Условный текст:**

```jsx id="9x8g1y"
<span>{condition ? "A" : "B"}</span>
```

Мы уже знаем:

> какой элемент нужен, но выбираем его содержимое.

---

# 🧠 Главное правило

Если **сам элемент всегда нужен**, но меняется только его содержимое:

```jsx id="cl8kft"
<Element>{condition ? "A" : "B"}</Element>
```

Это обычно проще и понятнее, чем создавать два одинаковых элемента.

---

# 3. Условные CSS-классы

Теперь нужно изменить внешний вид sold-out пиццы.

В CSS уже есть специальный класс:

```css id="s7c0ra"
.pizza.sold-out {
  filter: grayscale(100%);
  opacity: 0.5;
}
```

Нужно добавить `sold-out` только тогда, когда:

```js id="2jmb9r"
pizza.soldOut === true;
```

---

# 4. Проблема с обычной строкой

Обычно класс пишется так:

```jsx id="k23t7h"
<li className="pizza">
```

Но нам нужно иногда получить:

```text id="5ng8v9"
pizza
```

а иногда:

```text id="rqz2gf"
pizza sold-out
```

Поэтому строку нужно сделать **динамической**.

---

# 5. Template Literal

Для этого удобно использовать **template literal**:

```jsx id="v4svb8"
<li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
```

Обрати внимание на обратные кавычки:

```js id="zop2h3"
`...`;
```

а не обычные:

```js id="r5d9sk"
"...";
```

Template literal позволяет вставлять JavaScript-выражения через:

```js id="6z9q8n"
${...}
```

---

# 6. Как работает `${}`

Например:

```js id="c20qz8"
const name = "Pizza";

`Hello ${name}`;
```

получим:

```text id="i8d0fc"
Hello Pizza
```

В нашем случае:

```jsx id="9w25as"
`pizza ${pizza.soldOut ? "sold-out" : ""}`;
```

Если:

```js id="04i4re"
pizza.soldOut === true;
```

получается:

```text id="7n7q6c"
pizza sold-out
```

Если:

```js id="72qv47"
pizza.soldOut === false;
```

получается:

```text id="u2s1j4"
pizza
```

---

# 7. Полный пример

```jsx id="yp4n7f"
<li className={`pizza ${pizza.soldOut ? "sold-out" : ""}`}>
  <img src={pizza.photoName} alt={pizza.name} />

  <div>
    <h3>{pizza.name}</h3>

    <p>{pizza.ingredients}</p>

    <span>{pizza.soldOut ? "SOLD OUT" : pizza.price}</span>
  </div>
</li>
```

Теперь:

### Обычная пицца

```text id="o9k0ib"
className="pizza"

price → 10
```

### Sold out

```text id="9j7w3f"
className="pizza sold-out"

text → SOLD OUT
```

---

# 🔀 8. Как здесь используется Conditional Rendering?

Здесь используются **два разных вида условной логики**.

### Условный текст

```jsx id="06ec98"
{
  pizza.soldOut ? "SOLD OUT" : pizza.price;
}
```

Результат:

```text id="wczlqb"
true  → SOLD OUT
false → price
```

### Условный класс

```jsx id="f3v6ob"
`${pizza.soldOut ? "sold-out" : ""}`;
```

Результат:

```text id="5h02gc"
true  → "sold-out"
false → ""
```

---

# 🆚 9. Почему здесь используется Ternary, а не `&&`?

Потому что нам нужно получить **два разных значения**.

Для текста:

```jsx id="m4v3z6"
{
  pizza.soldOut ? "SOLD OUT" : pizza.price;
}
```

Нам нужны:

```text id="x4c7d3"
true  → "SOLD OUT"
false → price
```

Для класса:

```jsx id="x4p9st"
pizza.soldOut ? "sold-out" : "";
```

Нам нужны:

```text id="z9b1q8"
true  → "sold-out"
false → ""
```

Это классический случай для:

```text id="t6u5ce"
condition ? A : B
```

---

# 10. `&&` vs Ternary

### `&&`

Используем, когда:

> **показать что-то или ничего**

```jsx id="8b7m9k"
{
  isOpen && <Order />;
}
```

---

### Ternary

Используем, когда:

> **нужно выбрать между двумя значениями**

```jsx id="q1qyd2"
{
  isOpen ? "Open" : "Closed";
}
```

Или:

```jsx id="31b9d4"
{
  soldOut ? "SOLD OUT" : price;
}
```

---

# 📌 11. JSX делает это проще

В обычном JavaScript/DOM для изменения содержимого элемента пришлось бы вручную работать с DOM:

```js id="o7j4ks"
element.textContent = ...
```

А для классов — например, менять `className`:

```js id="1n0jhz"
element.className = ...
```

В React мы просто **описываем, каким должен быть UI**:

```jsx id="40r7ev"
<span>{soldOut ? "SOLD OUT" : price}</span>
```

```jsx id="o5t0rc"
<li className={`pizza ${soldOut ? "sold-out" : ""}`}>
```

Это связано с декларативным подходом React:

> Мы описываем **что хотим увидеть**, а не пошагово говорим DOM, как это изменить.

---

# 🌐 12. Title страницы

В конце проекта также меняем стандартный title документа.

В:

```text id="k1t6n9"
public/index.html
```

находим:

```html id="zyr9fl"
<title>React App</title>
```

и меняем на:

```html id="r3c2wd"
<title>Fast React Pizza Co.</title>
```

Теперь название отображается во вкладке браузера.

---

# 🧠 Главное

### 1. Элемент можно оставить постоянным, а его содержимое сделать динамическим

```jsx id="d2p1y9"
<span>{soldOut ? "SOLD OUT" : price}</span>
```

---

### 2. Для выбора между двумя значениями используем ternary

```jsx id="5qj7fj"
condition ? valueA : valueB;
```

---

### 3. CSS-класс тоже может быть динамическим

```jsx id="6d6u6w"
className={`pizza ${soldOut ? "sold-out" : ""}`}
```

---

### 4. Template Literal позволяет собирать строки

```js id="j5y7b3"
`pizza ${className}`;
```

`${...}` позволяет вставить JavaScript-выражение внутрь строки.

---

### 5. Conditional Rendering бывает разным

```text id="s6r9i1"
Нужно показать / скрыть?
        ↓
       &&

Нужно выбрать A или B?
        ↓
     Ternary

Нужно полностью изменить return?
        ↓
   Early Return

Нужно оставить элемент,
но изменить его содержимое?
        ↓
     Ternary

Нужно добавить/убрать CSS-класс?
        ↓
 Ternary + Template Literal
```

---

# 🎯 Итоговая ментальная модель

```text id="r8z4p2"
                Conditional Rendering
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
         &&           Ternary       Early Return
          │              │              │
     JSX / nothing      A / B       другой return
                         │
                  ┌──────┴──────┐
                  ↓             ↓
             Text content    CSS class
```

**Ключевая идея урока:**

> В React не обязательно условно создавать весь элемент. Часто элемент нужен всегда, а условным нужно сделать только **его содержимое или CSS-класс**. Для этого особенно удобно использовать **тернарный оператор**.
