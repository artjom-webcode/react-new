1. [Handling Events the React Way](#handling-events-the-react-way)
2. [Creating a State Variable With useState](#Creating-a-State-Variable-With-useState)
3. [Updating State Based on Current State](#Updating-State-Based-on-Current-State)

## Handling Events the React Way

```jsx
function App() {
  function helloFunction() {
    alert("Hello");
  }

  return (
    <div>
      <button onClick={helloFunction}>Click</button>
    </div>
  );
}

export default App;
```

На экране кнопка. При нажатии на нее выскакивает alert.

## Creating a State Variable With useState

```jsx
import { useState } from "react";

function App() {
  const [step, setStep] = useState(1);

  function helloFunction() {
    if (step < 10) {
      setStep(step + 1);
    }
  }

  return (
    <div>
      <button onClick={helloFunction}>Click</button>
      <p>{step}</p>
    </div>
  );
}

export default App;
```

- **State** — это данные компонента, которые могут изменяться.
- При изменении state React **автоматически перерисовывает компонент**.
- Для создания state используется **`useState`**.
- `useState` возвращает:
  - текущее значение state;
  - функцию для его изменения.

- Вторую функцию обычно называют через **`set` + имя state**.
- У state обязательно есть **начальное значение**.
- State можно использовать в **JSX и логике компонента**.
- State нужно изменять **только через setter-функцию**.
- Нельзя изменять state напрямую.
- Event handlers могут изменять state.
- После вызова setter React обновляет интерфейс с новым значением.
- **`useState` — это React Hook**.
- Hooks начинаются с `use`.
- Hooks можно вызывать **только на верхнем уровне компонента**.
- Нельзя вызывать Hooks:
  - внутри `if`;
  - внутри циклов;
  - внутри вложенных функций.

- Условия можно использовать **внутри event handler**, чтобы ограничивать изменение state.
- State позволяет создавать **динамические компоненты** без ручного изменения DOM.
  Да. Для хорошего понимания `state` я бы добавил к твоему конспекту вот эти важные моменты:

* **State является локальным для конкретного компонента.**
* Каждый экземпляр компонента имеет **свой собственный state**.
* Изменение state вызывает **повторный рендер компонента**.
* При повторном рендере React снова выполняет функцию компонента.
* **Не стоит воспринимать state как обычную переменную**, значение которой просто меняется внутри функции.
* Изменять state нужно через **setter**, а не напрямую.
* Обновление state может быть **не мгновенным** — React планирует обновление и затем делает новый render.
* Если новое состояние зависит от предыдущего состояния, безопаснее использовать **предыдущее значение** через функциональное обновление.
* Можно иметь **несколько state** в одном компоненте.
* State может хранить не только числа и строки, но и:
  - boolean;
  - массивы;
  - объекты;
  - другие значения.

* При работе с объектами и массивами нельзя просто мутировать существующее значение — обычно нужно создавать **новый объект или массив**.
* State можно передавать другим компонентам через **props**.
* Если нескольким компонентам нужно совместно использовать одни данные, state часто **поднимают выше** — это называется **lifting state up**.
* State и props отличаются:
  - **props** приходят от родительского компонента;
  - **state** принадлежит самому компоненту.

* `useState` можно использовать **несколько раз** в одном компоненте.
* Порядок вызова Hooks должен оставаться **одинаковым между рендерами**.
* Если вызвать setter несколько раз подряд, React может **сгруппировать обновления** (batching).
* State хранится между рендерами, поэтому его значение **не сбрасывается при каждом вызове функции компонента**.
* **State → изменение данных → новый render → обновлённый UI** — это одна из главных идей React.

## Updating State Based on Current State

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>+2</button>
    </div>
  );
}
```

- Часто новый state зависит от предыдущего значения. `setStep(step + 1); setStep(step - 1); setIsOpen(!isOpen);` На первый взгляд это работает нормально. Но проблема возникает, если мы обновляем state несколько раз подряд.
- Правильный способ — callback function `setStep(s => s + 1);`
