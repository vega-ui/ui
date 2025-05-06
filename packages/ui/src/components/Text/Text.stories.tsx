import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text.tsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Text> = {
  title: 'UI-Core/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1470&t=2RYEGgF9z3n5SpP5-11',
    },
  },
  args: {
    children: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.'
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Each: Story = {
  args: {},
  render() {
    const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const
    return (
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        {sizes.map((size, index) => (
            <Text size={size}>{(index + 1).toString()}: Hello</Text>
          ))}
      </div>
    )
  }
};