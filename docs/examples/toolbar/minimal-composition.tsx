import { Button, Icon, Separator, Toggle, Toolbar, ToolbarItem } from '@vega-ui/react';
import { BoldIcon, ItalicIcon, LinkIcon, UnderlineIcon } from '@vega-ui/icons';

export default function MinimalComposition() {
  return (
    <Toolbar aria-label='Formatting'>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Bold'><Icon><BoldIcon /></Icon></Toggle>
      </ToolbarItem>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Italic'><Icon><ItalicIcon /></Icon></Toggle>
      </ToolbarItem>
      <ToolbarItem asChild>
        <Toggle square size='sm' aria-label='Underline'><Icon><UnderlineIcon /></Icon></Toggle>
      </ToolbarItem>
      <Separator orientation='vertical' />
      <ToolbarItem asChild>
        <Button square size='sm' variant='secondary' appearance='transparent' aria-label='Insert link'>
          <Icon><LinkIcon /></Icon>
        </Button>
      </ToolbarItem>
    </Toolbar>
  );
}
