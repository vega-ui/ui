import { useId, type CSSProperties } from 'react';
import {
  Button,
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuItemIndicator,
  MenuRadioGroup,
  MenuRadioItem,
  MenuTrigger,
  Separator,
  Text,
} from '@vega-ui/react';
import { CheckIcon } from '@vega-ui/icons';

const groupHeading: CSSProperties = {
  display: 'block',
  paddingInline: 'var(--spacing-8)',
  paddingBlock: 'var(--spacing-2)',
  color: 'var(--label-secondary)',
};

const indicatorEnd: CSSProperties = { marginInlineStart: 'auto' };

export default function ValidCompositionPatterns() {
  const panelsId = useId();
  const widthId = useId();

  return (
    <Menu>
      <MenuTrigger asChild>
        <Button size='sm' variant='secondary' appearance='ghost'>Editor</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Focus mode</MenuItem>
        <MenuItem>Full screen</MenuItem>
        <Separator />
        <MenuGroup aria-labelledby={panelsId}>
          <Text id={panelsId} size={2} fontWeight={500} style={groupHeading}>Panels</Text>
          <MenuCheckboxItem defaultChecked>Outline<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuCheckboxItem>
          <MenuCheckboxItem>Comments<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuCheckboxItem>
        </MenuGroup>
        <Separator />
        <MenuRadioGroup aria-labelledby={widthId} defaultValue='standard'>
          <Text id={widthId} size={2} fontWeight={500} style={groupHeading}>Page width</Text>
          <MenuRadioItem value='standard'>Standard<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuRadioItem>
          <MenuRadioItem value='wide'>Wide<MenuItemIndicator style={indicatorEnd}><CheckIcon /></MenuItemIndicator></MenuRadioItem>
        </MenuRadioGroup>
      </MenuContent>
    </Menu>
  );
}
