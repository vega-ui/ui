import type { Meta, StoryObj } from '@storybook/react';

import { ResponsiveModal } from './ResponsiveModal.tsx';
import { Button, Text } from '@adara-cs/ui-kit-web';
import { ResponsiveModalHeader } from './components';

const meta = {
  title: 'UI-Responsive/ResponsiveModal',
  component: ResponsiveModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ResponsiveModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerSlot: (ref, props) => <Button ref={ref} {...props}>Responsive modal</Button>,
  },
  render(args) {
    return (
      <ResponsiveModal {...args}>
        <ResponsiveModalHeader title='Заголовок' />
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
      </ResponsiveModal>
    )
  }
};

export const WithHeader: Story = {
  args: {
    triggerSlot: (ref, props) => <Button ref={ref} {...props}>Responsive modal</Button>,
    children: (
      <>
        <ResponsiveModalHeader />
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
      </>
    )
  },
}