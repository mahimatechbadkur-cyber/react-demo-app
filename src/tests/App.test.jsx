import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import App from '../App.jsx';

// Mock the component modules so App tests don't depend on their implementations
vi.mock('../components/BookList', () => ({
  BookList: () => <div data-testid="mock-product-list">Mock ProductList</div>
}));
vi.mock('../components/Cart', () => ({
  Cart: () => <div data-testid="mock-cart">Mock Cart</div>
}));

const addToCartMock = vi.fn();
vi.mock('../context/CardContext.jsx', () => ({
  useCart: () => ({ addToCart: addToCartMock,
    cart: [] }),
   }));

afterEach(() => {
  cleanup();
  addToCartMock.mockReset();
});

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('App', () => {
  it('renders header, product section and cart sidebar with mocked components', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Modern Vite Shop 2025');
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Our Products');

    expect(screen.getByTestId('mock-product-list')).toBeInTheDocument();
    expect(screen.getByTestId('mock-cart')).toBeInTheDocument();

    expect(document.querySelector('.catalog')).toBeTruthy();
    expect(document.querySelector('.cart-sidebar')).toBeTruthy();
  });
});