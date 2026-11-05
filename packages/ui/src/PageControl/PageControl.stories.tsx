import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageControl, PageControlProps } from './PageControl';
import { PageControlItem, PageControlProgress } from './components';

const meta = {
  title: 'Navigation/PageControl',
  component: PageControl,
  subcomponents: {
    PageControlItem,
    PageControlProgress,
  },
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2943-6670&t=HpDBe4lBNsmz9mds-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    defaultActive: {
      control: 'number',
    },
  },
  args: {
    'aria-label': 'Slides',
    defaultActive: 0,
    children: [
      <PageControlItem key={0} index={0} aria-label='Slide 1' />,
      <PageControlItem key={1} index={1} aria-label='Slide 2' />,
      <PageControlItem key={2} index={2} aria-label='Slide 3' />,
      <PageControlItem key={3} index={3} aria-label='Slide 4' />,
    ],
  },
} satisfies Meta<typeof PageControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: PageControlProps['size'][] = ['sm', 'md', 'lg'];

export const Playground: Story = {};

export const Matrix: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {sizes.map((size) => (
        <PageControl key={size} {...args} aria-label={`Slides ${size}`} size={size} />
      ))}
    </div>
  ),
};
