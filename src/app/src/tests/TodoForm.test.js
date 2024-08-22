import { render, screen, fireEvent, act } from '@testing-library/react';
import TodoForm from '../components/TodoForm';
import axios from 'axios';

jest.mock('axios');

test('renders todo form and handles submit', async () => {
  const fetchTodosMock = jest.fn();
  const setErrorMock = jest.fn();

  axios.post.mockResolvedValue({ status: 201 });

  render(<TodoForm fetchTodos={fetchTodosMock} setError={setErrorMock} />);
  
  const inputElement = screen.getByLabelText(/todo/i);
  const buttonElement = screen.getByRole('button', { name: /add todo/i });

  fireEvent.change(inputElement, { target: { value: 'New Todo' } });
  expect(inputElement.value).toBe('New Todo');

  
  await act(async () => {
    fireEvent.click(buttonElement);
  });

  expect(fetchTodosMock).toHaveBeenCalled();
  expect(inputElement.value).toBe(''); 
});

test('disables submit button when loading', async () => {
  const fetchTodosMock = jest.fn();
  const setErrorMock = jest.fn();

  const setIsLoadingMock = jest.fn();

  render(<TodoForm fetchTodos={fetchTodosMock} setError={setErrorMock} />);
  
  const buttonElement = screen.getByRole('button', { name: /add todo/i });

  fireEvent.click(buttonElement);
  
  await act(async () => {
    expect(buttonElement).toBeDisabled();
  });
});
