import type { Meta, StoryObj } from '@storybook/react';

import { PartialMeter, PartialMeterProps } from './PartialMeter.tsx';
import { PartialMeterItem } from './components';
import { CSSProperties } from 'react';
import { Label } from '../Label';
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip';

const sizes: PartialMeterProps['size'][] = ['sm', 'md', 'lg'] as const

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof PartialMeter> = {
  title: 'UI-Core/PartialMeter/PartialMeter',
  component: PartialMeter,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=2273-5914&t=RUt89rPgQMrw8K8U-11',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: '150px' },
    children: [
      <PartialMeterItem value={.15} style={{ '--meter-item-color': 'var(--color-red-accent-500)'} as CSSProperties} />,
      <PartialMeterItem value={.35} style={{ '--meter-item-color': 'var(--color-green-accent-500)'} as CSSProperties} />,
      <PartialMeterItem value={.2} style={{ '--meter-item-color': 'var(--color-pink-accent-500)'} as CSSProperties} />,
      <PartialMeterItem value={.05} style={{ '--meter-item-color': 'var(--color-purple-accent-500)'} as CSSProperties} />,
    ]
  },
};

export const Sizes: Story = {
  render(props) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sizes.map((size, index) =>
          <PartialMeter value={.5} style={{ width: 100 + index * 50 + 'px' }} size={size} {...props}>
            <PartialMeterItem value={.35} style={{ '--meter-item-color': 'var(--color-blue-accent-500)'} as CSSProperties} />
            <PartialMeterItem value={.35} style={{ '--meter-item-color': 'var(--color-green-accent-500)'} as CSSProperties} />
            <PartialMeterItem value={.2} style={{ '--meter-item-color': 'var(--color-pink-accent-500)'} as CSSProperties} />
            <PartialMeterItem value={.1} style={{ '--meter-item-color': 'var(--color-purple-accent-500)'} as CSSProperties} />
          </PartialMeter>
        )}
      </div>
    )
  }
};

export const WithLabel: Story = {
  args: {
    style: { width: '150px' },
    id: 'partialMeterWithLabel',
  },
  render(props) {
    return (
      <div>
        <Label size='small' htmlFor='partialMeterWithLabel' style={{ marginBottom: '4px' }}>Disk usage:</Label>
        <PartialMeter value={1} {...props}>
          <PartialMeterItem value={.15} style={{ '--meter-item-color': 'var(--color-red-accent-500)'} as CSSProperties} />
          <PartialMeterItem value={.35} style={{ '--meter-item-color': 'var(--color-green-accent-500)'} as CSSProperties} />
          <PartialMeterItem value={.2} style={{ '--meter-item-color': 'var(--color-pink-accent-500)'} as CSSProperties} />
          <PartialMeterItem value={.05} style={{ '--meter-item-color': 'var(--color-purple-accent-500)'} as CSSProperties} />
        </PartialMeter>
      </div>
    )
  },
};

export const WithLabelAndTooltip: Story = {
  args: {
    style: { width: '150px' },
    id: 'partialMeterWithLabel',
  },
  render(props) {
    return (
      <div>
        <Label size='small' htmlFor='partialMeterWithLabel' style={{ marginBottom: '4px' }}>Disk usage:</Label>
        <PartialMeter value={1} {...props}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PartialMeterItem value={.15} style={{ '--meter-item-color': 'var(--color-red-accent-500)'} as CSSProperties} />
            </TooltipTrigger>
            <TooltipContent>
              www: 15%
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <PartialMeterItem value={.15} style={{ '--meter-item-color': 'var(--color-green-accent-500)'} as CSSProperties} />
            </TooltipTrigger>
            <TooltipContent>
              users: 15%
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <PartialMeterItem value={.2} style={{ '--meter-item-color': 'var(--color-pink-accent-500)'} as CSSProperties} />
            </TooltipTrigger>
            <TooltipContent>
              drives: 20%
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <PartialMeterItem value={.05} style={{ '--meter-item-color': 'var(--color-purple-accent-500)'} as CSSProperties} />
            </TooltipTrigger>
            <TooltipContent>
              bin: 5%
            </TooltipContent>
          </Tooltip>
        </PartialMeter>
      </div>
    )
  },
};