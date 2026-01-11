import type { Meta, StoryObj } from '@storybook/react-vite';
import { PaginationTriggerIconButton } from './PaginationTriggerIconButton';
import { Icon } from '../../../Icon';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon, MoveLeft, MoveRight } from '@vega-ui/icons';

const meta = {
  title: 'Navigation/Pagination/PaginationTriggerIconButton',
  component: PaginationTriggerIconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    }
  },
  args: {
    children: <Icon><DoubleArrowLeftIcon /></Icon>
  },
} satisfies Meta<typeof PaginationTriggerIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {}

export const Link: Story = {
  args: {
    asChild: true,
    children: <a href='#'><Icon><DoubleArrowLeftIcon /></Icon></a>
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const NextButton: Story = {
  args: {
    children: <Icon><MoveRight /></Icon>
  }
}

export const PrevButton: Story = {
  args: {
    children: <Icon><MoveLeft /></Icon>
  }
}

export const FirstButton: Story = {
  args: {
    children: <Icon><DoubleArrowLeftIcon /></Icon>
  }
}

export const LastButton: Story = {
  args: {
    children: <Icon><DoubleArrowRightIcon /></Icon>
  }
}