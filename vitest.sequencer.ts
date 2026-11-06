import { dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BaseSequencer, type TestSpecification } from 'vitest/node';

const repoRoot = dirname(fileURLToPath(import.meta.url));

/**
 * Approximate run time in seconds (slowest browser, GitHub-hosted runner) of test files
 * that take 2 s or more. Unlisted files count as DEFAULT_WEIGHT.
 * Refresh when a file gets much slower or faster: the "Run Browser Tests" CI step
 * prints the duration of every file.
 */
const weights: Record<string, number> = {
  'packages/ui/src/Sheet/__tests__/Sheet.browser.test.tsx': 50,
  'packages/ui/src/Calendar/__tests__/Calendar.browser.test.tsx': 39,
  'packages/ui/src/Dialog/__tests__/Dialog.browser.test.tsx': 28,
  'packages/ui/src/Drawer/__tests__/Drawer.browser.test.tsx': 21,
  'packages/ui/src/DateTimeField/__tests__/DateTimeField.browser.test.tsx': 11,
  'packages/ui/src/DateField/__tests__/DateField.browser.test.tsx': 11,
  'packages/ui/src/DateRangeField/__tests__/DateRangeField.browser.test.tsx': 8,
  'packages/ui/src/Select/__tests__/Select.browser.test.tsx': 7,
  'packages/ui/src/PhoneField/__tests__/PhoneField.browser.test.tsx': 5,
  'packages/ui/src/Popover/__tests__/Popover.browser.test.tsx': 4,
  'packages/ui/src/Accordion/__tests__/Accordion.browser.test.tsx': 4,
  'packages/ui/src/Tooltip/__tests__/Tooltip.browser.test.tsx': 4,
  'packages/ui/src/SnapScroller/__tests__/SnapScroller.browser.test.tsx': 3,
  'packages/ui/src/Calendar/__tests__/CalendarRtl.browser.test.tsx': 3,
  'packages/ui/src/NumberField/__tests__/NumberField.browser.test.tsx': 3,
  'packages/ui/src/IndexedSnapScroller/__tests__/IndexedSnapScroller.browser.test.tsx': 2,
};
const DEFAULT_WEIGHT = 0.5;

const pathOf = (spec: TestSpecification) => relative(repoRoot, spec.moduleId).split('\\').join('/');
const weightOf = (spec: TestSpecification) => weights[pathOf(spec)] ?? DEFAULT_WEIGHT;
const keyOf = (spec: TestSpecification) => `${spec.project.name}:${pathOf(spec)}`;

/**
 * Splits test files between `--shard`s by expected run time instead of Vitest's
 * hash-based split, which put the four slowest files into the same shard.
 * Greedy longest-first packing; deterministic, so every shard computes the same split.
 */
export class BalancedSequencer extends BaseSequencer {
  override async shard(files: TestSpecification[]): Promise<TestSpecification[]> {
    const { index, count } = this.ctx.config.shard ?? { index: 1, count: 1 };
    const shards = Array.from({ length: count }, () => ({ time: 0, files: [] as TestSpecification[] }));

    const ordered = [...files].sort((a, b) => weightOf(b) - weightOf(a) || keyOf(a).localeCompare(keyOf(b)));
    for (const spec of ordered) {
      const lightest = shards.reduce((min, shard) => (shard.time < min.time ? shard : min));
      lightest.files.push(spec);
      lightest.time += weightOf(spec);
    }

    return shards[index - 1]?.files ?? [];
  }
}
