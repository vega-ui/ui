import { Button, PageControl, PageControlItem, PageControlProgress, Text } from '@vega-ui/react';
import { useState } from 'react';

const stories = ['New arrivals', 'Autumn sale', 'Gift cards', 'Store opening'];

export default function TimedProgressIndicators() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = () => setActive((active + 1) % stories.length);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Text size={4} fontWeight={600} aria-live={paused ? 'polite' : 'off'}>{stories[active]}</Text>
      <PageControl active={active} onChangeActive={setActive} aria-label='Stories'>
        {stories.map((story, index) => {
          if (paused) {
            return <PageControlItem key={story} index={index} aria-label={story} />;
          }

          return (
            <PageControlProgress
              key={story}
              index={index}
              duration={4000}
              aria-label={story}
              onAnimationEnd={index === active ? advance : undefined}
            />
          );
        })}
      </PageControl>
      <Button size='sm' variant='secondary' appearance='ghost' aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? 'Resume autoplay' : 'Pause autoplay'}
      </Button>
    </div>
  );
}
