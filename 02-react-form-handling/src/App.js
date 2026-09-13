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
