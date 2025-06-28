import { useEffect, useState, type FC } from "react";
import "./todo.css";
import type { iTodo } from "../../shared/interfaces";
import useTodos from "../../hooks/useTodos";
import { FaRegPlusSquare } from "react-icons/fa";
import Filters from "../../components/Filters/Filters";
import TodoItem from "../../components/TodoItem/TodoItem";
const Todo: FC = () => {
  const { todos, addTodo, deleteTodo, editTodo, toggleComplete, filter, filteredTodos, setFilter } =
    useTodos();

  const [input, setInput] = useState("");
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const [removingTodos, setRemovingTodos] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleAddTodo = () => {
    if (!input.trim()) {
      setError("Name cannot be empty");
      return;
    }
    addTodo(input);
    setInput("");
    setError("");
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
      <h1>To-Do List</h1>
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
          <TodoItem
            key={todo.uid}
            todo={todo}
            isRemoving={removingTodos.includes(todo.uid)}
            onToggleComplete={toggleComplete}
            onEdit={editTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Todo;
