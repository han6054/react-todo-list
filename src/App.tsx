import React, { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: newTodo, completed: false },
      ]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const allActive = () => {
     setTodos((prevTodos) =>  prevTodos.map((todo) => ({ ...todo, completed:  true })))
  }

  return (
    <div className="container mx-auto p-4">
      <div className="h-[300px] bg-purple-300"></div>
      <div className="w-[600px] m-auto -mt-[200px]">
        <h1 className="text-3xl font-bold mb-4 text-white">Todo List</h1>
        <div className="mb-4 flex">
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-xl"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <ul className="rounded-lg text-gray-500">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center justify-between p-3 rounded-sm border bg-white ${
                todo.completed ? "line-through" : ""
              }`}
            >
              <button
                className="text-green-500 mr-2"
                onClick={() => toggleComplete(todo.id)}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>

              <span>{todo.text}</span>
              <div>
                <button
                  className="text-red-500"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
          <li className="flex items-center justify-between p-3 px-5 rounded-sm border cursor-pointer bg-white">
            <span>{todos.length} items left</span>
            <span onClick={allActive}>All active Completed</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
