import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from '../components/Game';

describe('Game Component', () => {
  test('renders the game board', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button');
    expect(squares.length).toBe(10);
  });

  test('allows players to take turns', () => {
    render(<Game />);
    const firstSquare = screen.getAllByRole('button')[0];
    fireEvent.click(firstSquare);
    expect(firstSquare).toHaveTextContent('X');

    const secondSquare = screen.getAllByRole('button')[1];
    fireEvent.click(secondSquare);
    expect(secondSquare).toHaveTextContent('O');
  });

  test('declares a winner', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button');
    
    // Simulate a winning scenario
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[3]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[6]); // X

    const winnerMessage = screen.getByText(/winner: x/i);
    expect(winnerMessage).toBeInTheDocument();
  });

  test('resets the game', () => {
    render(<Game />);
    const squares = screen.getAllByRole('button');
    
    // Simulate a winning scenario
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[3]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[6]); // X

    const resetButton = screen.getByText(/Reset/i);
    fireEvent.click(resetButton);

    const winnerMessage = screen.queryByText(/winner: x/i);
    expect(winnerMessage).not.toBeInTheDocument();
    expect(squares[0]).toHaveTextContent('');
  });
});