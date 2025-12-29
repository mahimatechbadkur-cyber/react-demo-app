import { describe, it, expect } from 'vitest';
import * as CardContext from '../context/CardContext.jsx';

describe('CardContext module exports', () => {
  it('exports at least one symbol', () => {
    const keys = Object.keys(CardContext);
    expect(keys.length).toBeGreaterThan(0);
  });
});