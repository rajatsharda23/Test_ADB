import { render, screen } from '@testing-library/react';
import TodoList from '../components/TodoList';

test('renders list of todos', () => {
  const todos = [{ description: 'Buy milk' }, { description: 'Walk the dog' }];
  render(<TodoList todos={todos} isLoading={false} />);
  
  const todoItems = screen.getAllByRole('listitem');
  expect(todoItems).toHaveLength(2);
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
  expect(screen.getByText('Walk the dog')).toBeInTheDocument();
});

test('displays loading indicator when loading', () => {
  render(<TodoList todos={[]} isLoading={true} />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
