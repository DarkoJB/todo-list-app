import type { FC } from "react";
import type { iTodo } from "../../shared/interfaces";
import TodoName from "../TodoName/TodoName";
import { FaRegTrashAlt } from "react-icons/fa";
import "./todo-item.css";

const TodoItem: FC<{
  todo: iTodo;
  isRemoving: boolean;
  onToggleComplete: (uid: string) => void;
  onEdit: (uid: string, name: string) => void;
  onDelete: (uid: string) => void;
}> = ({ todo, isRemoving, onToggleComplete, onEdit, onDelete }) => (
  <li className={`todo-item ${todo.completed ? "completed" : ""} ${isRemoving ? "removing" : ""}`}>
    <input
      type="checkbox"
      name="toggle complete"
      checked={todo.completed}
      onChange={() => onToggleComplete(todo.uid)}
    />
    <TodoName todo={todo} handleChange={(name: string) => onEdit(todo.uid, name)} />
    <button onClick={() => onDelete(todo.uid)} aria-label="Delete Todo" title="Delete Todo">
      <FaRegTrashAlt size={"15"} />
    </button>
  </li>
);

export default TodoItem;
