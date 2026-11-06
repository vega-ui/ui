import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { BalancedSequencer } from './vitest.sequencer';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  test: {
    // Balance `--shard` runs by file run time (see vitest.sequencer.ts)
    sequence: { sequencer: BalancedSequencer },
  },
})
