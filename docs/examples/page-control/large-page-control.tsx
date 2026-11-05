import { PageControl, PageControlItem } from '@vega-ui/react';

export default function LargePageControl() {
  return (
    <PageControl size='lg' defaultActive={0} aria-label='Onboarding screens'>
      <PageControlItem index={0} aria-label='Welcome' />
      <PageControlItem index={1} aria-label='Connect your calendar' />
      <PageControlItem index={2} aria-label='Invite your team' />
    </PageControl>
  );
}
