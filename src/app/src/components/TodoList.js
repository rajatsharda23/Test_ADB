import React from 'react';
import '../Styles/TodoList.css';

function TodoList({ todos, isLoading }) {
  return (
    <div className="TodoList">
      <h2>List of TODOs</h2>
      <button onClick={() => window.location.reload()}>REFRESH</button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
