import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as CardModule from '../components/Cart.jsx';
import { cleanup, screen } from '@testing-library/react';
import { beforeEach, afterEach,vi } from 'vitest';

const Cart = CardModule.Cart || CardModule.default;
let mockCart = [];
vi.mock('../context/CardContext.jsx', () => ({
  useCart: () => ({ cart: mockCart }),
}));
beforeEach(() => { mockCart = []; });
afterEach(() => { cleanup(); vi.resetAllMocks(); });

describe('Card component', () => {
  it('shows empty message when cart has no items', () => {
    expect(Cart).toBeDefined();
    mockCart = [];
    render(<Cart />);
    expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });

  it('renders a single item and correct totals with no discount', () => {
    mockCart = [{ id: 1, title: 'Book A', price: 50, quantity: 1 }];
    render(<Cart />);

    expect(screen.getByText(/Book A x 1/)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount without discount - 50/)).toBeInTheDocument(); 
    //expect(screen.getByText(/discounted amount - 0/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /discounted amount - 0/i })).toBeInTheDocument();
    expect(screen.getByText(/Total Amount with discount - 50/)).toBeInTheDocument();
  });

  it('computes optimal grouping and shows breakdown for example cart', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 2 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 2 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 2 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
      { id: 5, title: 'Working effectively with Legacy Code', price: 50, quantity: 1 },
    ];
    render(<Cart />);
    expect(screen.getByText(/Total Amount without discount - 400/)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Amount - 80/)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount with discount - 320/)).toBeInTheDocument();
  });
  it('computes optimal grouping and shows breakdown for example cart', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 1 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 1 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 1 },
      { id: 4, title: 'Test Driven Development by Example', price: 50, quantity: 1 },
      { id: 5, title: 'Working effectively with Legacy Code', price: 50, quantity: 1 },
    ];
    render(<Cart />);
    expect(screen.getByText(/Total Amount without discount - 250/)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Amount - 62.5/)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount with discount - 187.5/)).toBeInTheDocument();
  });
   it('computes optimal grouping and shows breakdown for example cart', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 1 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 1 },
      { id: 3, title: 'Clean Architecture', price: 50, quantity: 1 }
    ];
    render(<Cart />);
    expect(screen.getByText(/Total Amount without discount - 150/)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Amount - 15/)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount with discount - 135/)).toBeInTheDocument();
  });
   it('computes optimal grouping and shows breakdown for example cart', () => {
    mockCart = [
      { id: 1, title: 'Clean Code', price: 50, quantity: 1 },
      { id: 2, title: 'Clean Coder', price: 50, quantity: 1 },
    ];
    render(<Cart />);
    expect(screen.getByText(/Total Amount without discount - 100/)).toBeInTheDocument();
    expect(screen.getByText(/Discounted Amount - 5/)).toBeInTheDocument();
    expect(screen.getByText(/Total Amount with discount - 95/)).toBeInTheDocument();
  });
});