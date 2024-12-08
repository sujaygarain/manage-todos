
import { useState, useEffect } from 'react';
import { TodoProvider } from './contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-500">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Manage Your Todos
          </h1>
          <TodoForm />
          <div className="mt-4">
            {todos.length > 0 ? (
              <ul className="space-y-4">
                {todos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No todos found.</p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;



