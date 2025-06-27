import { useEffect, useState, type FC } from "react";
import "./todo.css";
import type { CompletedStatus, iTodo } from "../../shared/interfaces";
import useTodos from "../../hooks/useTodos";
import { FaRegPlusSquare, FaRegTrashAlt } from "react-icons/fa";
const Todo: FC = () => {
  const { todos, addTodo, deleteTodo, toggleComplete } = useTodos();

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<CompletedStatus>("All"); // 'all', 'active', 'completed'

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo: iTodo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  const handleAddTodo = () => {
    addTodo(input);
    setInput("");
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
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && addTodo(input)}
        />
        <button onClick={handleAddTodo} aria-label="Add Todo" title="Add Todo">
          <FaRegPlusSquare size={"20"} />
        </button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("All")} className={filter === "All" ? "active" : ""}>
          All
        </button>
        <button onClick={() => setFilter("Active")} className={filter === "Active" ? "active" : ""}>
          Active
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={filter === "Completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo: iTodo) => (
          <li key={todo.uid} className={`todo-item ${todo.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.uid)}
            />
            <span>{todo.name}</span>
            <button
              onClick={() => deleteTodo(todo.uid)}
              aria-label="Delete Todo"
              title="Delete Todo"
            >
              <FaRegTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
