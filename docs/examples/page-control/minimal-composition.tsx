import { PageControl, PageControlItem } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <PageControl defaultActive={0} aria-label='Slides'>
      <PageControlItem index={0} aria-label='Slide 1 of 3' />
      <PageControlItem index={1} aria-label='Slide 2 of 3' />
      <PageControlItem index={2} aria-label='Slide 3 of 3' />
    </PageControl>
  );
}
