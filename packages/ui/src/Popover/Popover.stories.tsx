import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placement } from '@floating-ui/react';

import { Popover, PopoverProps } from './Popover';
import { PopoverContent, PopoverContentProps, PopoverTrigger } from './components';
import { Button } from '../Button';
import { Text } from '../Text';
import { Heading } from '../Heading';
import { subcomponentArgs } from '../../../../.storybook/subcomponentArgs';

type PopoverStoryProps = PopoverProps & Pick<PopoverContentProps, 'shadowed'>;

const PLACEMENTS: Placement[] = [
  'top-start', 'top', 'top-end',
  'left', 'right',
  'bottom-start', 'bottom', 'bottom-end',
];

const content = subcomponentArgs(PopoverContent, ['shadowed']);

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  subcomponents: {
    PopoverTrigger,
    PopoverContent,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1686&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    placement: {
      control: 'select',
      options: PLACEMENTS,
    },
    role: {
      control: 'radio',
      options: ['dialog', 'listbox'],
    },
    ...content.argTypes,
  },
  args: {
    placement: 'bottom',
    shadowed: true,
  },
} satisfies Meta<PopoverStoryProps>;

export default meta;
type Story = StoryObj<PopoverStoryProps>;

export const Playground: Story = {
  render: (args) => {
    const [contentProps, popoverProps] = content.split(args);

    return (
      <Popover {...popoverProps}>
        <PopoverTrigger asChild>
          <Button>Share</Button>
        </PopoverTrigger>
        <PopoverContent {...contentProps}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 260 }}>
            <Heading size={5} fontWeight={600} as='h3'>Share project</Heading>
            <Text size={2}>Anyone with the link can view this project.</Text>
            <Button>Copy link</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 8 }}>
      {PLACEMENTS.map((placement) => (
        <Popover key={placement} placement={placement}>
          <PopoverTrigger asChild>
            <Button variant='secondary'>{placement}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Text size={2}>{`Grows out of the side facing ${placement}.`}</Text>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
