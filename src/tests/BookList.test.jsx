import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { fireEvent, screen, cleanup } from '@testing-library/react';
import * as BookListModule from '../components/BookList.jsx';
const { BookList } = BookListModule;
// mock the context hook and expose a spy for assertions
const addToCartMock = vi.fn();
vi.mock('../context/CardContext.jsx', () => ({
  useCart: () => ({ addToCart: addToCartMock }),
}));

afterEach(() => {
  cleanup();
  addToCartMock.mockReset();
});

describe('BookList component', () => {
  it('is exportable and renders without crashing', () => {
    expect(BookList).toBeDefined();
    const { container } = render(<BookList />);
     // product title renders
    expect(screen.getByText(/Clean Code - 50 EUR/)).toBeInTheDocument();

    // click the first Add to Cart button
    const buttons = screen.getAllByRole('button', { name: /Add to Cart/i });
    fireEvent.click(buttons[0]);

    // ensure addToCart was called with the product object (id:1)
    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
  });
});