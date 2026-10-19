import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(function () {
    async function todoFetch() {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/todos");
        if (!res.ok) throw new Error("Something went wrong with fetching todos");
        const data = await res.json();

        setTodos(data);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    todoFetch();
  }, []);
  return (
    <ul>
      {isloading && <Loader />}
      {!isloading && !error && <TodoList todos={todos} />}
      {error && <ErrorMsg message={error} />}
    </ul>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMsg({ message }) {
  return <p>{message}‼️</p>;
}

function TodoList({ todos }) {
  return todos.map((todo, i) => {
    if (i < 20) {
      return <li key={todo.id}>{todo.title}</li>;
    }
  });
}
export default App;
