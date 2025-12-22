import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Tic Tac Toe title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Tic Tac Toe/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders game status', () => {
  render(<App />);
  const statusElement = screen.getByText(/Next player: X/i);
  expect(statusElement).toBeInTheDocument();
});