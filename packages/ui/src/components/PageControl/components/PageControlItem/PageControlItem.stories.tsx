import type { Meta, StoryObj } from '@storybook/react';

import { PageControlItem } from './PageControlItem.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PageControlItem> = {
  title: 'Navigation/PageControl/PageControlItem',
  component: PageControlItem,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2945-6712&t=HpDBe4lBNsmz9mds-4',
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: [
        'default',
        'high-contrast',
      ]
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    index: 0
  },
};