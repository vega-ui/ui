# ToggleGroup Examples

## Basic

### Basic: view switcher above the content

The group keeps one view pressed at a time, and the parent shows the content of that view. Each item has an icon and a label. A second press on the pressed view keeps it pressed, so one view is always shown.

<!-- example: toggle-group/view-switcher.tsx -->
```tsx
import { useState, type ReactNode } from 'react';
import { Icon, Text, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';
import { CalendarIcon, KanbanIcon, ListIcon } from '@vega-ui/icons';

const views: { value: string, label: string, icon: ReactNode, summary: string }[] = [
  { value: 'list', label: 'List', icon: <ListIcon />, summary: '18 tasks, sorted by due date' },
  { value: 'board', label: 'Board', icon: <KanbanIcon />, summary: '4 columns: To do, In progress, Review, Done' },
  { value: 'week', label: 'Week', icon: <CalendarIcon />, summary: '6 tasks due this week' },
];

export default function ViewSwitcher() {
  const [view, setView] = useState('list');
  const current = views.find((item) => item.value === view) ?? views[0];

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 440 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <Text size={4} fontWeight={600}>Launch plan</Text>
        <ToggleGroup aria-label='View' size='xs' value={view} onChangeValue={setView}>
          {views.map((item) => (
            <ToggleGroupToggle key={item.value} value={item.value}>
              <Icon size='xs'>{item.icon}</Icon>
              {item.label}
            </ToggleGroupToggle>
          ))}
        </ToggleGroup>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: 120,
          padding: 'var(--spacing-8)',
          border: '1px dashed var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Text size={2} style={{ color: 'var(--label-secondary)', textAlign: 'center' }}>{current.summary}</Text>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Controlled/Stateful

### Controlled/Stateful: priority filters with several pressed items

`multiple` turns each priority on and off by itself, and the parent filters the list by the array. With no item pressed, the list shows every task; "Clear" empties the value.

<!-- example: toggle-group/priority-filters.tsx -->
```tsx
import { useState } from 'react';
import { Button, Text, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';

const priorities = [
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'low', label: 'Low' },
];

const tasks = [
  { id: 1, title: 'Fix the checkout timeout', priority: 'urgent' },
  { id: 2, title: 'Renew the SSL certificate', priority: 'urgent' },
  { id: 3, title: 'Review the onboarding copy', priority: 'high' },
  { id: 4, title: 'Update the team page', priority: 'low' },
  { id: 5, title: 'Archive old invoices', priority: 'low' },
];

export default function PriorityFilters() {
  const [filters, setFilters] = useState<string[]>(['urgent']);
  const shown = filters.length === 0 ? tasks : tasks.filter((task) => filters.includes(task.priority));

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', boxSizing: 'border-box', width: '100%', maxWidth: 400 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
        <ToggleGroup aria-label='Priority' size='xs' multiple value={filters} onChangeValue={setFilters}>
          {priorities.map((priority) => (
            <ToggleGroupToggle key={priority.value} value={priority.value}>{priority.label}</ToggleGroupToggle>
          ))}
        </ToggleGroup>
        <Button size='xs' variant='secondary' appearance='transparent' style={{ marginInlineStart: 'auto' }} onClick={() => setFilters([])}>Clear</Button>
      </div>
      <ul style={{ display: 'grid', gap: 'var(--spacing-2)', margin: 0, padding: 0, listStyle: 'none' }}>
        {shown.map((task) => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 'var(--spacing-4)',
              padding: 'var(--spacing-4) var(--spacing-6)',
              borderRadius: 'var(--radius-4)',
              background: 'var(--fills-quaternary)',
            }}
          >
            <Text size={2} style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{task.title}</Text>
            <Text size={2} style={{ flexShrink: 0, color: 'var(--label-secondary)' }}>
              {priorities.find((priority) => priority.value === task.priority)?.label}
            </Text>
          </li>
        ))}
      </ul>
      <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>
        {filters.length === 0 ? `All ${tasks.length} tasks` : `${shown.length} of ${tasks.length} tasks`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Layout/Overlay

### Layout/Overlay: groups in a toolbar

Inside a `Toolbar`, the style group with `multiple` and the alignment group give their Tab stop and arrow keys to the toolbar: the Left and Right arrows move through the items of both groups and the "More formatting" button, and Tab enters the toolbar on its first item, not on a pressed one.

<!-- example: toolbar/text-editor.tsx -->
```tsx
import { useState, type CSSProperties } from 'react';
import {
  Icon,
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItem,
  MenuItemIndicator,
  MenuTrigger,
  Separator,
  Text,
  ToggleGroup,
  ToggleGroupToggle,
  Toolbar,
  ToolbarItem,
} from '@vega-ui/react';
import {
  BoldIcon,
  CheckIcon,
  EllipsisIcon,
  ItalicIcon,
  TextAlignCenterIcon,
  TextAlignEndIcon,
  TextAlignStartIcon,
  UnderlineIcon,
} from '@vega-ui/icons';

type Alignment = 'start' | 'center' | 'end';

export default function TextEditor() {
  const [marks, setMarks] = useState<string[]>(['bold']);
  const [alignment, setAlignment] = useState<Alignment>('start');
  const [struckThrough, setStruckThrough] = useState(false);

  const clearFormatting = () => {
    setMarks([]);
    setAlignment('start');
    setStruckThrough(false);
  };

  const decorations: string[] = [];
  if (marks.includes('underline')) decorations.push('underline');
  if (struckThrough) decorations.push('line-through');

  const preview: CSSProperties = {
    margin: 0,
    padding: 'var(--spacing-8)',
    textAlign: alignment,
    fontWeight: marks.includes('bold') ? 700 : 400,
    fontStyle: marks.includes('italic') ? 'italic' : 'normal',
    textDecoration: decorations.length === 0 ? 'none' : decorations.join(' '),
    overflowWrap: 'anywhere',
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        maxWidth: 480,
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
        background: 'var(--surface-primary)',
        overflow: 'hidden',
      }}
    >
      <Toolbar aria-label='Formatting' style={{ padding: 'var(--spacing-3)', borderBlockEnd: '1px solid var(--separator-opaque)' }}>
        <ToggleGroup aria-label='Text style' size='xs' multiple value={marks} onChangeValue={setMarks}>
          <ToggleGroupToggle value='bold' square aria-label='Bold'><Icon><BoldIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='italic' square aria-label='Italic'><Icon><ItalicIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='underline' square aria-label='Underline'><Icon><UnderlineIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Separator orientation='vertical' />
        <ToggleGroup aria-label='Alignment' size='xs' value={alignment} onChangeValue={(value) => setAlignment(value as Alignment)}>
          <ToggleGroupToggle value='start' square aria-label='Align start'><Icon><TextAlignStartIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='center' square aria-label='Align center'><Icon><TextAlignCenterIcon /></Icon></ToggleGroupToggle>
          <ToggleGroupToggle value='end' square aria-label='Align end'><Icon><TextAlignEndIcon /></Icon></ToggleGroupToggle>
        </ToggleGroup>
        <Menu placement='bottom-end' size='sm'>
          <ToolbarItem asChild>
            <MenuTrigger asChild>
              <Button square size='xs' variant='secondary' appearance='transparent' aria-label='More formatting' style={{ marginInlineStart: 'auto' }}>
                <Icon><EllipsisIcon /></Icon>
              </Button>
            </MenuTrigger>
          </ToolbarItem>
          <MenuContent>
            <MenuCheckboxItem checked={struckThrough} onChangeChecked={setStruckThrough}>
              <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
              Strikethrough
            </MenuCheckboxItem>
            <Separator />
            <MenuItem onClick={clearFormatting}>Clear formatting</MenuItem>
          </MenuContent>
        </Menu>
      </Toolbar>
      <Text asChild size={3}>
        <p style={preview}>Ship the toolbar first, then write its docs and examples.</p>
      </Text>
    </div>
  );
}
```
<!-- /example -->

## Disabled

### Disabled: a quality that the plan does not include

`disabled` on the "4K" item disables its button: a click does nothing, and the arrow keys skip it. The hint under the group explains why, and `aria-describedby` on the group points at it.

<!-- example: toggle-group/video-quality.tsx -->
```tsx
import { useId, useState } from 'react';
import { HelperText, Text, ToggleGroup, ToggleGroupToggle } from '@vega-ui/react';

const qualities = [
  { value: 'auto', label: 'Auto', pro: false },
  { value: '720p', label: '720p', pro: false },
  { value: '1080p', label: '1080p', pro: false },
  { value: '4k', label: '4K', pro: true },
];

export default function VideoQuality() {
  const labelId = useId();
  const hintId = useId();
  const [quality, setQuality] = useState('auto');

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-4)', boxSizing: 'border-box', width: '100%', maxWidth: 360 }}>
      <Text id={labelId} size={3} fontWeight={500}>Video quality</Text>
      <ToggleGroup aria-labelledby={labelId} aria-describedby={hintId} size='xs' value={quality} onChangeValue={setQuality}>
        {qualities.map((item) => (
          <ToggleGroupToggle key={item.value} value={item.value} disabled={item.pro}>{item.label}</ToggleGroupToggle>
        ))}
      </ToggleGroup>
      <HelperText id={hintId}>4K streaming is part of the Pro plan.</HelperText>
    </div>
  );
}
```
<!-- /example -->
