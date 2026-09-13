## React: форма добавления элемента (Controlled Form)

```jsx
import { useState } from "react";

function App() {
  return (
    <div>
      <Form />
    </div>
  );
}

export default App;
function Form() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault(); // 1. Предотвращаем перезагрузку страницы

    if (!description) return; // 2. Guard Clause (защита от пустой формы)

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    console.log("Создан элемент:", newItem);

    // 3. Сброс формы к начальному состоянию
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Что вам нужно для поездки?</h3>

      {/* Управляемый select */}
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Управляемый input */}
      <input
        type="text"
        placeholder="Предмет..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button>Добавить</button>
    </form>
  );
}
```

1. `useState` хранит **описание** и **количество**.
2. `input` и `select` связаны со state → это **управляемые элементы**.
3. При изменении вызывается `setDescription` / `setQuantity`.
4. При отправке формы `handleSubmit`:
   - отменяет перезагрузку (`preventDefault`);
   - проверяет, что описание не пустое;
   - создаёт объект `newItem`;
   - выводит его в `console`;
   - очищает форму.

5. `Array.from()` создаёт варианты количества **от 1 до 10**.

**Главная идея для запоминания:**

> **State → управляет формой → Submit → создаём объект → сбрасываем форму.**
