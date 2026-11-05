import { Button, Tooltip, TooltipArrow, TooltipContent, TooltipTrigger } from '@vega-ui/react';
import { useState } from 'react';

const limit = 3;

export default function SlottedDisabledButton() {
  const [used, setUsed] = useState(3);
  const blocked = used >= limit;

  const createProject = () => {
    if (blocked) return;
    setUsed(used + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-4)', width: '100%' }}>
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button type='button' aria-disabled={blocked} onClick={createProject}>
              New project
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <TooltipArrow />
            {blocked ? `Your plan includes ${limit} projects` : 'Create an empty project'}
          </TooltipContent>
        </Tooltip>
        <Button type='button' variant='secondary' appearance='ghost' disabled={used === 0} onClick={() => setUsed(used - 1)}>
          Archive a project
        </Button>
      </div>
      <p role='status' style={{ margin: 0, color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {used} of {limit} projects used
      </p>
    </div>
  );
}
