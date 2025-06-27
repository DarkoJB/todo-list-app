import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
const Todo = lazy(() => import("./pages/Todo/Todo.tsx"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Todo />} />
      </Routes>
    </Suspense>
  );
}

export default App;
