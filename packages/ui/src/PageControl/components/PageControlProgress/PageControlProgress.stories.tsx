import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageControlProgress } from './PageControlProgress';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PageControlProgress> = {
  title: 'Navigation/PageControl/PageControlProgress',
  component: PageControlProgress,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2945-6792&t=HpDBe4lBNsmz9mds-4',
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
  args: {},
};