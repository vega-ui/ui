import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressTrack } from './ProgressTrack';
import { Progress } from '../../Progress';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ProgressTrack> = {
  title: 'Feedback/Progress/MeterTrack',
  component: ProgressTrack,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2268-5896&t=KIqUXkO2Fq2zdfys-11',
    },
  },
  args: {},
  decorators(Story) {
    return (
      <Progress value={10} style={{ width: 300 }}>
        <Story />
      </Progress>
    )
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};