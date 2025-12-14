import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionContent } from './AccordionContent';
import { Text } from '../../../Text';
import { Accordion } from '../../Accordion.tsx';
import { AccordionItem } from '../AccordionItem';

const meta = {
  title: 'Actions/Accordion/AccordionContent',
  component: AccordionContent,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-6037&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AccordionContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render({ ...props }) {
    return (
      <AccordionContent {...props}>
        <Text>Hello, World!</Text>
      </AccordionContent>
    )
  },
  decorators(Story) {
    return (
      <Accordion opened={['1']}>
        <AccordionItem value={'1'}>
          <Story />
        </AccordionItem>
      </Accordion>
    )
  }
}