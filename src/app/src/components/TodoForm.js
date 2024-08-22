import { useState } from 'react';
import axios from 'axios';
import '../Styles/TodoForm.css';

function TodoForm({ fetchTodos, setError }) {
  const [todoDescription, setTodoDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true);
        const resp = await axios.post('http://localhost:8000/todos/', { description: todoDescription });
        if (resp && resp.status === 201) {
            console.log('posted!');
        } 
        setTodoDescription('');
        await fetchTodos();
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <div className="TodoForm">
      <h2>Create a Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="todo">Todo:</label>
          <input
            type="text"
            id="todo"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '5px' }}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoForm;
