import { beforeEach, describe, it, expect, vi } from 'vitest';

const renderSpy = vi.fn();
const createRootSpy = vi.fn(() => ({ render: renderSpy }));

vi.mock('react-dom/client', () => ({ createRoot: createRootSpy }));

describe('main.jsx bootstrap', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    renderSpy.mockReset();
    createRootSpy.mockReset();
  });

  it('creates root and calls render once', async () => {
    await import('../main'); // import after mocks and DOM ready
    expect(createRootSpy).toHaveBeenCalled();
    expect(createRootSpy.mock.calls[0][0].id).toBe('root');
    expect(renderSpy).toHaveBeenCalledTimes(1);
  });
});