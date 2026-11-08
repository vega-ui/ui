import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { BalancedSequencer } from './vitest.sequencer';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  test: {
    sequence: { sequencer: BalancedSequencer },
  },
})
