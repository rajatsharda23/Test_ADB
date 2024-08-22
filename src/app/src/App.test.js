import { render, screen, waitFor } from '@testing-library/react';
import App from './App.js';
import axios from 'axios';

jest.mock('axios');

test('fetches and displays todos', async () => {
  const todos = [{ description: 'Buy milk' }, { description: 'Walk the dog' }];
  axios.get.mockResolvedValue({ data: todos });

  render(<App />);

  // Wait for todos to be displayed
  await waitFor(() => {
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(screen.getByText('Walk the dog')).toBeInTheDocument();
  });
});

test('handles fetch error', async () => {
  axios.get.mockRejectedValue(new Error('Failed to fetch'));

  render(<App />);

  // Wait for the error to be displayed
  await waitFor(() => {
    const errorElement = screen.getByText(/Failed to fetch/i);
    expect(errorElement).toBeInTheDocument();
  });
});