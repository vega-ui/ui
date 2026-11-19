import { useState } from 'react';
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
  type MenuCheckboxItemProps,
  type MenuRadioItemProps,
} from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';

export function MyMenuCheckboxItem({ children, ...props }: MenuCheckboxItemProps) {
  return (
    <MenuCheckboxItem {...props}>
      <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
      {children}
    </MenuCheckboxItem>
  );
}

export function MyMenuRadioItem({ children, ...props }: MenuRadioItemProps) {
  return (
    <MenuRadioItem {...props}>
      <MenuItemIndicator><CheckIcon /></MenuItemIndicator>
      {children}
    </MenuRadioItem>
  );
}

export default function Recipe() {
  const [showCompleted, setShowCompleted] = useState(false);
  const [density, setDensity] = useState('comfortable');

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>View</Button>
      </MenuTrigger>
      <MenuContent>
        <MyMenuCheckboxItem checked={showCompleted} onChangeChecked={setShowCompleted}>Show completed</MyMenuCheckboxItem>
        <Separator />
        <MenuRadioGroup aria-label='Density' value={density} onChangeValue={setDensity}>
          <MyMenuRadioItem value='comfortable'>Comfortable</MyMenuRadioItem>
          <MyMenuRadioItem value='compact'>Compact</MyMenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
