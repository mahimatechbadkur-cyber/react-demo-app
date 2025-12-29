import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as CardModule from '../components/Cart.jsx';

const Cart = CardModule.Cart || CardModule.default;
vi.mock('../context/CardContext.jsx', () => ({
  useCart: () => ({ cart: [] }),
}));
describe('Card component', () => {
  it('is exportable and renders without crashing', () => {
    expect(Cart).toBeDefined();
    const { container } = render(<Cart />);
    expect(container).toBeTruthy();
  });
});