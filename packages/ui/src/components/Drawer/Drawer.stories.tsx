import type { Meta, StoryObj } from '@storybook/react';

import { Drawer } from './Drawer.tsx';
import { Text } from '../Text';
import { Button } from '../Button';
import { DrawerHeader } from './components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Drawer> = {
  title: 'UI-Core/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(props) {
    return (
      <Drawer {...props} triggerSlot={(ref, props) => <Button fullWidth ref={ref} {...props}>Open</Button>}>
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </Drawer>
    )
  }
}

export const WithoutOverlay: Story = {
  args: {
    withOverlay: false,
  },
  render(props) {
    return (
      <Drawer
        {...props}
        style={{ maxWidth: '80%' }}
        headerSlot={<DrawerHeader title='Hello' />}
        triggerSlot={(ref, props) => <Button fullWidth ref={ref} {...props}>Open</Button>}
      >
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </Drawer>
    )
  }
}

export const WithHeader: Story = {
  args: {
    withOverlay: false,
  },
  render(props) {
    return (
      <Drawer
        {...props}
        style={{ maxWidth: '80%' }}
        headerSlot={<DrawerHeader title='Hello' />}
        triggerSlot={(ref, props) => <Button fullWidth ref={ref} {...props}>Open</Button>}
      >
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </Drawer>
    )
  }
}

export const Scrollable: Story = {
  args: {
    withOverlay: false,
  },
  render(props) {
    return (
      <Drawer
        {...props}
        style={{ maxWidth: '80%' }}
        headerSlot={<DrawerHeader title='Hello' />}
        triggerSlot={(ref, props) => <Button fullWidth ref={ref} {...props}>Open</Button>}
      >
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
        <Text as='p' size={3} style={{ maxWidth: '400px' }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Text>
      </Drawer>
    )
  }
}