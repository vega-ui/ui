import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs, TabsProps } from './Tabs';
import { TabsList, TabsPanel, TabsTab } from './components';

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  subcomponents: {
    TabsList,
    TabsTab,
    TabsPanel,
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    activation: {
      control: 'radio',
      options: ['automatic', 'manual'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
  },
  args: {
    defaultValue: 'overview',
    children: [
      <TabsList key='list' aria-label='Project'>
        <TabsTab value='overview'>Overview</TabsTab>
        <TabsTab value='activity'>Activity</TabsTab>
        <TabsTab value='settings'>Settings</TabsTab>
      </TabsList>,
      <TabsPanel key='overview' value='overview'>The project summary.</TabsPanel>,
      <TabsPanel key='activity' value='activity'>Recent changes.</TabsPanel>,
      <TabsPanel key='settings' value='settings'>Project settings.</TabsPanel>,
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const sizes: TabsProps['size'][] = ['sm', 'md', 'lg'];
const orientations: TabsProps['orientation'][] = ['horizontal', 'vertical'];
const states = [
  { state: 'first selected', defaultValue: 'overview', disabled: undefined },
  { state: 'middle selected', defaultValue: 'activity', disabled: undefined },
  { state: 'with a disabled tab', defaultValue: 'overview', disabled: 'activity' },
  { state: 'disabled tab selected', defaultValue: 'activity', disabled: 'activity' },
];

export const Playground: Story = {};

export const Matrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${orientations.length}, auto)`, gap: 32, alignItems: 'start' }}>
      {states.flatMap((row) => sizes.map((size) => orientations.map((orientation) => {
        const name = `${row.state} / ${size} / ${orientation}`;

        return (
          <Tabs key={name} size={size} orientation={orientation} defaultValue={row.defaultValue}>
            <TabsList aria-label={name}>
              <TabsTab value='overview'>Overview</TabsTab>
              <TabsTab value='activity' disabled={row.disabled === 'activity'}>Activity</TabsTab>
              <TabsTab value='settings'>Settings</TabsTab>
            </TabsList>
            <TabsPanel value='overview'>{name}</TabsPanel>
            <TabsPanel value='activity'>{name}</TabsPanel>
            <TabsPanel value='settings'>{name}</TabsPanel>
          </Tabs>
        );
      })))}
    </div>
  ),
};
