import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

export function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8000/todos/');
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      console.log('Error fetching todos:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>TODOs</h1>
      <TodoList todos={todos} isLoading={isLoading} />
      <TodoForm fetchTodos={fetchTodos} setError={setError} />
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
}

export default App;
