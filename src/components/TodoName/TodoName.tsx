import { useState, type FC } from "react";
import type { iTodo } from "../../shared/interfaces";
import "./todo-name.css";
import { FaCheck, FaPen } from "react-icons/fa";
import useError from "../../hooks/useError";

const TodoName: FC<{
  todo: iTodo;
  handleChange: (newName: string) => void;
}> = ({ todo, handleChange }) => {
  const [input, setInput] = useState(todo.name);
  const [editMode, setEditMode] = useState(false);
  const { error, setError } = useError();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const handleSave = () => {
    if (input.trim().length === 0) {
      setError("Name cannot be empty");
      return;
    }
    handleChange(input);
    setEditMode(false);
  };

  return (
    <div className="edit-mode">
      {!editMode ? (
        <span onClick={toggleEditMode}>{todo.name}</span>
      ) : (
        <input
          name="edit todo"
          className="edit-input"
          type="text"
          value={input}
          onChange={(event) => {
            setError("");
            setInput(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      )}
      <button
        onClick={() => {
          !editMode ? toggleEditMode() : handleSave();
        }}
        aria-label={!editMode ? "Edit Todo" : "Save Todo"}
        title={!editMode ? "Edit Todo" : "Save Todo"}
      >
        {!editMode ? <FaPen size={"15"} /> : <FaCheck size={"15"} />}
      </button>
      {error && <label className="error-popup">{error}</label>}
    </div>
  );
};

export default TodoName;
