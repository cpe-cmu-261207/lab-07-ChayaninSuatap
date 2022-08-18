import { useEffect, useState } from "react";
import Todo from "../components/Todo";

export default function Home() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const str = localStorage.getItem("261207-lab-07");
    if (!str) return;
    setTodos(JSON.parse(str));
  }, []);

  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    localStorage.setItem("261207-lab-07", JSON.stringify(todos));
  }, [todos]);

  const todoInputOnKeyUpHandler = (e) => {
    if (e.key !== "Enter") return;
    if (!todoInput) {
      alert("Todo cannot be empty");
      return;
    }
    const newTask = {
      title: todoInput,
      completed: false,
    };
    setTodos([newTask, ...todos]);
    setTodoInput("");
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    setTodos([...todos]);
  };

  const markTodo = (idx) => {
    todos[idx].completed = !todos[idx].completed;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx === 0) return;
    const title = todos[idx].title;
    const completed = todos[idx].completed;
    todos[idx].title = todos[idx - 1].title;
    todos[idx].completed = todos[idx - 1].completed;
    todos[idx - 1].title = title;
    todos[idx - 1].completed = completed;
    setTodos([...todos]);
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) return;
    const title = todos[idx].title;
    const completed = todos[idx].completed;
    todos[idx].title = todos[idx + 1].title;
    todos[idx].completed = todos[idx + 1].completed;
    todos[idx + 1].title = title;
    todos[idx + 1].completed = completed;
    setTodos([...todos]);
  };

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          onKeyUp={todoInputOnKeyUpHandler}
        />
        {/* Todos */}
        {todos.map((todo, i) => (
          <Todo
            key={i}
            title={todo.title}
            completed={todo.completed}
            deleteFn={() => deleteTodo(i)}
            markFn={() => markTodo(i)}
            onMoveUp={() => moveUp(i)}
            onMoveDown={() => moveDown(i)}
          />
        ))}

        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning"> Pending ({todos.filter((x) => x.completed === false).length}) </span>
          <span className="text-success"> Completed ({todos.filter((x) => x.completed === true).length}) </span>
        </p>

        <p className="text-center mt-3 text-muted fst-italic">
          made by Chayanin Suatap 12345679
        </p>
      </div>
    </div>
  );
}
