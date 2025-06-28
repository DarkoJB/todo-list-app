import { useEffect, useState } from "react";
import { randomUid } from "../utils/randomString";
import type { iTodo } from "../shared/interfaces";

const useTodos = () => {
  const [todos, setTodos] = useState<iTodo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (name: string) => {
    setTodos([...todos, { uid: randomUid(), name, completed: false }]);
  };

  const deleteTodo = (uid: string) => {
    setTodos(todos.filter((todo) => todo.uid !== uid));
  };

  const editTodo = (uid: string, newName: string) => {
    setTodos(
      todos.map((todo) =>
        todo.uid === uid ? { ...todo, name: newName.trim() === "" ? todo.name : newName } : todo
      )
    );
  };

  const toggleComplete = (uid: string) => {
    setTodos(
      todos.map((todo) => (todo.uid === uid ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    editTodo,
    toggleComplete,
  };
};

export default useTodos;
