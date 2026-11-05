import { Progress, ProgressTrack } from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Progress value={40} aria-label='Upload progress' fullWidth>
      <ProgressTrack />
    </Progress>
  );
}
