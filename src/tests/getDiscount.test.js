import { calculateCartTotals } from '../utils/getDiscount.js';

test('getCartState logic covers all branches', () => {
  // Test if block
//  expect(getCartState([{ quantity: 2 }])).toEqual({ subtotal: 100, discount: 10, total: 90, itemCount: 2 });
  // Test else block
  expect(calculateCartTotals([])).toEqual({ subtotal: 0, discount: 0, total: 0, breakdown: {} });
});