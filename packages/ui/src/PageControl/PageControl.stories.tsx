import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageControl } from './PageControl';
import { PageControlItem, PageControlProgress } from './components';
import { useState } from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PageControl> = {
  title: 'Navigation/PageControl/PageControl',
  component: PageControl,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2943-6670&t=HpDBe4lBNsmz9mds-4',
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
    children: [
      <PageControlItem index={0} />,
      <PageControlItem index={1} />,
      <PageControlItem index={2} />,
      <PageControlItem index={3} />,
    ]
  },
};

export const Progress: Story = {
  args: {},
  render(props) {
    const [active, setActive] = useState(0)

    return (
      <PageControl {...props} onChangeActive={setActive} active={active}>
        <PageControlProgress index={0} onAnimationEnd={() => setActive(1)} />
        <PageControlProgress index={1} onAnimationEnd={() => setActive(2)} />
        <PageControlProgress index={2} onAnimationEnd={() => setActive(3)} />
        <PageControlProgress index={3} onAnimationEnd={() => setActive(0)} />
      </PageControl>
    )
  }
};