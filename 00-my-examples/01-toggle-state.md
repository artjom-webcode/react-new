# Toggle State в React

## ![Описание картинки](toggle-state.png)

## App.jsx

```jsx
import { useState } from "react";

function App() {
  const [open, setIsOpen] = useState(true);

  function openFunction() {
    setIsOpen((is) => !is);
  }

  return (
    <div>
      <button onClick={openFunction}>Click</button>
      {open && <p>Hidden text</p>}
    </div>
  );
}

export default App;
```

#### Что делает код

Этот React-компонент отображает кнопку и текст. При нажатии на кнопку
значение `open` переключается между `true` и `false`.

- `true` → текст отображается
- `false` → текст скрыт
