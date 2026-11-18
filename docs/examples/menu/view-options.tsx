import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';

const sorts = [
  { value: 'due', label: 'Due date' },
  { value: 'priority', label: 'Priority' },
  { value: 'title', label: 'Title' },
];

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

export default function ViewOptions() {
  const sortHeadingId = useId();
  const [showCompleted, setShowCompleted] = useState(false);
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [sort, setSort] = useState('due');
  const sortLabel = sorts.find((item) => item.value === sort)?.label ?? '';

  const hidden: string[] = [];
  if (!showCompleted) hidden.push('completed');
  if (!showSubtasks) hidden.push('subtasks');

  const sorted = `Sorted by ${sortLabel.toLowerCase()}`;
  const summary = hidden.length === 0 ? sorted : `${sorted} · ${hidden.join(' and ')} hidden`;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)', width: '100%', maxWidth: 480 }}>
      <Text size={2} style={{ color: 'var(--label-secondary)' }}>{summary}</Text>
      <Menu placement='bottom-end'>
        <MenuTrigger asChild>
          <Button size='sm' variant='secondary' appearance='ghost' style={{ flexShrink: 0 }}>View</Button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={showCompleted} onChangeChecked={setShowCompleted}>
            <MenuItemIndicator />
            Show completed
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showSubtasks} onChangeChecked={setShowSubtasks}>
            <MenuItemIndicator />
            Show subtasks
          </MenuCheckboxItem>
          <Separator />
          <MenuRadioGroup aria-labelledby={sortHeadingId} value={sort} onChangeValue={setSort}>
            <Text id={sortHeadingId} size={2} fontWeight={500} style={groupHeading}>Sort by</Text>
            {sorts.map((item) => (
              <MenuRadioItem key={item.value} value={item.value}>
                <MenuItemIndicator />
                {item.label}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    </div>
  );
}
