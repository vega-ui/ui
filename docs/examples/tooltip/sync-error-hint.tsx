import { useState } from 'react';
import {
  Badge,
  Button,
  Icon,
  IconButton,
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';
import { CircleAlertIcon } from '@vega-ui/icons';

const integrations = [
  { name: 'Slack', error: '' },
  { name: 'Google Drive', error: 'Access expired on Nov 1. Reconnect to resume syncing.' },
  { name: 'Jira', error: '' },
];

export default function SyncErrorHint() {
  const [fixed, setFixed] = useState<string[]>([]);

  return (
    <ul
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        paddingInline: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-2)',
        listStyle: 'none',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {integrations.map((integration, index) => {
        const failing = integration.error !== '' && !fixed.includes(integration.name);

        return (
          <li
            key={integration.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              minWidth: 0,
              paddingBlock: 'var(--spacing-5)',
              borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined,
            }}
          >
            <Text size={3} style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{integration.name}</Text>
            {!failing && <Badge variant='success' size='xs'>Synced</Badge>}
            {failing && (
              <>
                <Badge variant='error' size='xs'>Sync failed</Badge>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <IconButton aria-label={`Why ${integration.name} sync failed`} size='xs' variant='secondary' appearance='ghost'>
                      <Icon size='xs'><CircleAlertIcon /></Icon>
                    </IconButton>
                  </TooltipTrigger>
                  <TooltipContent>
                    <TooltipArrow />
                    <Text size={2}>{integration.error}</Text>
                  </TooltipContent>
                </Tooltip>
                <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setFixed([...fixed, integration.name])}>Reconnect</Button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}
