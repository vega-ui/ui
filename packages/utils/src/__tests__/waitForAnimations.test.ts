import { describe, expect, it } from 'vitest';
import { waitForAnimations } from '../waitForAnimations';

describe('waitForAnimations', () => {
  it('resolves after every animation settles, also a canceled one', async () => {
    const el = {
      getAnimations: () => [{ finished: Promise.resolve() }, { finished: Promise.reject(new Error('canceled')) }],
    } as unknown as Element;

    await expect(waitForAnimations(el)).resolves.toHaveLength(2);
  });

  it('resolves at once without animations', async () => {
    const el = { getAnimations: () => [] } as unknown as Element;

    await expect(waitForAnimations(el)).resolves.toEqual([]);
  });
});
