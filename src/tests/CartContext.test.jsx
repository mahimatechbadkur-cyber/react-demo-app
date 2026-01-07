import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CardContext.jsx'; // Adjust path accordingly
import { expect, it, describe } from 'vitest';
import * as CardModule from '../components/Cart.jsx';
import { BookList } from '../components/BookList.jsx';
import App from '../App.jsx';

const Cart = CardModule.Cart || CardModule.default;

describe('CartContext', () => {
  it('provides an empty initial cart', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );
     expect(screen.getByText(/no items found/i)).toBeInTheDocument();
  });

  it('adds a new Book to the cart', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

    const addButton = screen.getAllByText('Add to Cart');
    act(() => {
      addButton[0].click();
    });
    expect(screen.getByText(/Clean Architecture - 50 EUR/)).toBeInTheDocument();
    expect(screen.getByTestId('item-count').textContent).toBe('Your Cart has (1) items');
    expect(screen.getByTestId('item-1').textContent).toContain('Clean Code x 1 - 50 EUR');
  });

  it('increments quantity if the Book already exists in the cart', () => {
    render(
      <CartProvider>
         <App />
      </CartProvider>
    );

    const addButton = screen.getAllByText('Add to Cart');
    
    // Click twice
    act(() => {
      addButton[0].click();
    });
    act(() => {
      addButton[0].click();
    });

    expect(screen.getByTestId('item-count').textContent).toBe('Your Cart has (2) items'); // Length remains 1
    expect(screen.getByTestId('item-1').textContent).toContain('Clean Code x 2 - 100 EUR'); // Quantity should be 2
  });

  it('adds multiple different Books', () => {
    render(
      <CartProvider>
        <App />
      </CartProvider>
    );

   const addButton = screen.getAllByText('Add to Cart');
    
    // Click twice
    act(() => {
      addButton[0].click();
    });
    act(() => {
      addButton[1].click();
    });
     act(() => {
      addButton[2].click();
    });
     act(() => {
      addButton[2].click();
    });


    expect(screen.getByTestId('item-count').textContent).toBe('Your Cart has (4) items');
    expect(screen.getByTestId('item-1')).toBeDefined();
    expect(screen.getByTestId('item-2')).toBeDefined();
    expect(screen.getByTestId('item-3')).toBeDefined();
  });
});
