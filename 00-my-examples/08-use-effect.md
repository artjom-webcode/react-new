# `useEffect` — Side Effects в React

```jsx
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(function () {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <ul>
      {todos.map((todo, i) => {
        if (i < 20) {
          return <li key={i}>{todo.title}</li>;
        }
      })}
    </ul>
  );
}

export default App;
```

## Основные моменты

- **`useEffect`** — React Hook для выполнения **side effects**.
- **Side effect** — взаимодействие компонента с внешним миром.
- Side effects могут включать:
  - API-запросы
  - `localStorage`
  - таймеры
  - подписки
  - взаимодействие с внешними системами

- Side effects **не должны выполняться во время render logic**.
- `useEffect` позволяет выполнить side effect **после рендера**.
- Общая последовательность: **Render → UI → Effect**.
- `useEffect` принимает:
  - **effect function** — код side effect;
  - **dependency array** — определяет, когда effect запускается;
  - **cleanup function** — используется для очистки effect.

- Пустой массив `[]` означает, что effect запускается после **первого рендера**.
- При последующих рендерах такой effect повторно не запускается.
- `useEffect` может использоваться при **mount, re-render и unmount** — в зависимости от зависимостей и cleanup.
- Главная идея `useEffect` — **синхронизация компонента с внешней системой**.
- **Event handler** используется для реакции на событие.
- `useEffect` используется для автоматической синхронизации.
- Не следует **злоупотреблять `useEffect`**.
- Если side effect можно выполнить через event handler, обычно лучше использовать **event handler**.
