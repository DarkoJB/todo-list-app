import { useEffect, useMemo, useState } from "react";
import { randomUid } from "../utils/randomString";
import type { CompletedStatus, iTodo } from "../shared/interfaces";

const useTodos = (initialFilter: CompletedStatus = "All") => {
  const [todos, setTodos] = useState<iTodo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState<CompletedStatus>(initialFilter);

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

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "Active":
        return todos.filter((todo) => !todo.completed);
      case "Completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    deleteTodo,
    editTodo,
    toggleComplete,
  };
};

export default useTodos;
