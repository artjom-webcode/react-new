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
