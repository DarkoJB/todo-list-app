import { useEffect, useState, type FC } from "react";
import "./todo.css";
import type { CompletedStatus, iTodo } from "../../shared/interfaces";
import useTodos from "../../hooks/useTodos";
import { FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
import TodoName from "../../components/TodoName/TodoName";
import Filters from "../../components/Filters/Filters";
const Todo: FC = () => {
  const { todos, addTodo, deleteTodo, editTodo, toggleComplete } = useTodos();

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<CompletedStatus>("All"); // 'all', 'active', 'completed'
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const [removingTodos, setRemovingTodos] = useState<string[]>([]);
  const [error, setError] = useState("");

  const filteredTodos = todos.filter((todo: iTodo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    if (!input.trim()) {
      setError("Name cannot be empty");
      return;
    }
    addTodo(input);
    setInput("");
    setError("");
  };

  const handleEditTodo = (uid: string, name: string) => {
    editTodo(uid, name);
  };

  const handleDeleteTodo = (uid: string) => {
    setRemovingTodos((prev) => [...prev, uid]);
    setTimeout(() => {
      deleteTodo(uid);
      setRemovingTodos((prev) => prev.filter((id) => id !== uid));
    }, 300);
  };

  return (
    <div className="app">
      <h1>TODO List</h1>
      <div className="input-group">
        <input
          type="text"
          name="name"
          placeholder="Add a task..."
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setError("");
          }}
          onKeyDown={(event) => event.key === "Enter" && handleAddTodo()}
        />
        <button onClick={handleAddTodo} aria-label="Add Todo" title="Add Todo" disabled={!input}>
          <FaRegPlusSquare size={"20"} />
        </button>
        {error && <label className="error-popup">{error}</label>}
      </div>

      <Filters currentFilter={filter} setFilter={setFilter} />

      <ul className="todo-list">
        {filteredTodos.map((todo: iTodo) => (
          <li
            key={todo.uid}
            className={`todo-item ${todo.completed ? "completed" : ""} ${
              removingTodos.includes(todo.uid) ? "removing" : ""
            }`}
          >
            <input
              type="checkbox"
              name="toggle complete"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.uid)}
            />
            <TodoName todo={todo} handleChange={(name) => handleEditTodo(todo.uid, name)} />
            <button
              onClick={() => handleDeleteTodo(todo.uid)}
              aria-label="Delete Todo"
              title="Delete Todo"
            >
              <FaRegTrashAlt size={"15"} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
