import type { Meta, StoryObj } from '@storybook/react-vite';

import { MeterTrack } from './MeterTrack.tsx';
import { Meter } from '../../Meter';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof MeterTrack> = {
  title: 'Feedback/Meter/MeterTrack',
  component: MeterTrack,
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
      <Meter value={10} style={{ width: 300 }}>
        <Story />
      </Meter>
    )
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};