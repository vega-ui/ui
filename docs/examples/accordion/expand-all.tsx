import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTrigger,
  Button,
  Separator,
  Text,
} from '@vega-ui/react';

const sections = [
  { value: 'requirements', title: 'System requirements', body: 'Node.js 20 or later, 2 GB of free memory and outbound HTTPS access.' },
  { value: 'install', title: 'Installation', body: 'Run the installer, choose a workspace folder and sign in with your company account.' },
  { value: 'configure', title: 'Configuration', body: 'Set the region, connect a storage bucket and invite the first teammates.' },
  { value: 'upgrade', title: 'Upgrading', body: 'Back up the workspace folder, then install the new version over the old one.' },
];

export default function ExpandAll() {
  const [opened, setOpened] = useState<string[]>(['install']);

  const allOpen = opened.length === sections.length;

  const toggleAll = () => {
    if (allOpen) {
      setOpened([]);
      return;
    }
    setOpened(sections.map((section) => section.value));
  };

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 560 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-6)' }}>
        <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          {opened.length} of {sections.length} sections open
        </Text>
        <Button size='sm' variant='secondary' appearance='ghost' onClick={toggleAll}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </Button>
      </div>
      <Accordion multiple opened={opened} onChangeOpened={(next) => setOpened(next ?? [])}>
        {sections.map((section, index) => (
          <AccordionItem key={section.value} value={section.value}>
            <AccordionHeader>
              <AccordionTrigger>
                {section.title}
                <AccordionIcon />
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <Text size={3}>{section.body}</Text>
            </AccordionContent>
            {index < sections.length - 1 && <Separator />}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
