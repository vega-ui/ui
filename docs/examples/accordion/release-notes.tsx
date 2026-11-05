import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Text,
} from '@vega-ui/react';

const changes = [
  'Faster cold start for workspaces with more than 10\u00a0000 files',
  'Search now matches file paths as well as file contents',
  'Keyboard shortcut to duplicate the current tab',
  'Fixed a crash when a folder was renamed during sync',
  'Fixed wrong time zone in exported activity reports',
  'Audit log entries can be filtered by actor',
  'Dark theme contrast improvements in the sidebar',
  'Drag and drop now works between split panes',
  'API tokens can be scoped to a single project',
  'Removed the legacy v1 webhooks endpoint',
  'Updated the bundled certificate store',
  'Large CSV imports run in the background',
];

const pageSize = 4;

export default function ReleaseNotes() {
  const [visible, setVisible] = useState(pageSize);

  const hiddenCount = changes.length - visible;

  return (
    <Accordion defaultOpened={['release']} style={{ width: '100%', maxWidth: 420 }}>
      <AccordionItem value='release'>
        <AccordionHeader>
          <AccordionTrigger>
            <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
              v4.12.0-rc.3+build.20261103.experimental-telemetry-pipeline
            </span>
            <AccordionIcon />
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <ul style={{ margin: 0, paddingInlineStart: 'var(--spacing-10)', display: 'grid', gap: 'var(--spacing-2)' }}>
            {changes.slice(0, visible).map((change) => (
              <li key={change}>
                <Text size={2}>{change}</Text>
              </li>
            ))}
          </ul>
          {hiddenCount > 0 && (
            <Button size='sm' variant='secondary' appearance='ghost' onClick={() => setVisible(visible + pageSize)} style={{ marginBlockStart: 'var(--spacing-6)' }}>
              Show {Math.min(pageSize, hiddenCount)} more of {hiddenCount}
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
