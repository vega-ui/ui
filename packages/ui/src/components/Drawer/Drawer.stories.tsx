import type { Meta, StoryObj } from '@storybook/react';

import { Drawer } from './Drawer.tsx';
import { Text } from '../Text';
import { Button } from '../Button';
import { DrawerContent, DrawerHeader, DrawerTrigger } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Drawer> = {
  title: 'UI-Core/Drawer/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/VegaUI--Community-?node-id=0-1623&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open</Button>
        </DrawerTrigger>
        <DrawerContent>
          <Text asChild size={3} style={{ maxWidth: '400px' }}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </Text>
        </DrawerContent>
      </Drawer>
    )
  }
}

export const WithoutOverlay: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open</Button>
        </DrawerTrigger>
        <DrawerContent overlaid={false} style={{maxWidth: '80%'}}>
          <Text asChild size={3} style={{maxWidth: '400px'}}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Text>
        </DrawerContent>
      </Drawer>
    )
  }
}

export const WithHeader: Story = {
  render(props) {
    return (
      <Drawer {...props}>
        <DrawerTrigger asChild>
          <Button fullWidth>Open</Button>
        </DrawerTrigger>
        <DrawerContent overlaid={false} style={{ maxWidth: '80%' }} headerSlot={<DrawerHeader title='Hello' />}>
          <Text asChild size={3} style={{ maxWidth: '400px' }}>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Text>
        </DrawerContent>
      </Drawer>
    )
  }
}