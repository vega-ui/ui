import type { Meta, StoryObj } from '@storybook/react-vite';

import { Popover } from './Popover';
import { Button } from '../Button';
import { Text } from '../Text';
import { PopoverBackdrop, PopoverContent, PopoverTrigger } from './components';
import { useState } from 'react';
import { TextField, TextFieldInput } from '../TextField';
import { Separator } from '../Separator';
import { Heading } from '../Heading';

const meta = {
  title: 'Overlay/Popover/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/bcj4NcXIOZNwLIAzNFRnkt/vega-ui--Community-?node-id=0-1686&t=2RYEGgF9z3n5SpP5-4',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const contentSx = {
  maxWidth: 300,
};

const actionsListSx = {
  display: 'grid',
  gap: 6,
};

export const Default: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Popover</Button>
        </PopoverTrigger>
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Привет! Я — Popover
          </Heading>
          <Text asChild size={2}>
            <p>Быстрые действия и небольшой контент рядом с триггером.</p>
          </Text>
          <Button variant='secondary' appearance='transparent' onClick={(e) => console.log(e)}>
            Ок
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const WithBackdrop: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Popover</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Popover с Backdrop
          </Heading>
          <Text asChild size={2}>
            <p>Клик вне контента должен закрывать</p>
          </Text>
          <Button variant='secondary' appearance='transparent' onClick={(e) => console.log(e)}>
            Понял
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const HelpTooltip: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='transparent'>
            Что это?
          </Button>
        </PopoverTrigger>
        <PopoverContent style={contentSx}>
          <Text size={2}>
            Popover подходит для небольших контекстных пояснений рядом с элементом интерфейса.
          </Text>
        </PopoverContent>
      </>
    ),
  },
};

export const ConfirmAction: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Удалить</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Удалить файл?
          </Heading>
          <Text asChild size={2}>
            <p>Действие нельзя будет отменить</p>
          </Text>
          <Separator style={{ marginBlock: 12 }} />
          <Button onClick={() => console.log('confirm delete')}>
            Удалить
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const QuickActions: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Действия</Button>
        </PopoverTrigger>
        <PopoverContent style={contentSx}>
          <Text size={3}>Быстрые действия</Text>
          <div style={actionsListSx}>
            <Button appearance='transparent' variant='secondary' onClick={() => console.log('rename')}>
              Переименовать
            </Button>
            <Button appearance='transparent' variant='secondary' onClick={() => console.log('duplicate')}>
              Дублировать
            </Button>
            <Button appearance='transparent' variant='secondary' onClick={() => console.log('share')}>
              Поделиться
            </Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const UserMenu: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary' appearance='transparent'>
            Профиль
          </Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent>
          <div style={{ display: 'grid', gap: 2 }}>
            <Text size={3}>Name</Text>
            <Text size={2}>example@example.com</Text>
          </div>
          <Separator style={{ marginBlock: 12 }} />
          <div>
            <Button fullWidth appearance='transparent' variant='secondary' onClick={() => console.log('settings')}>
              Настройки
            </Button>
            <Button fullWidth appearance='transparent' variant='secondary' onClick={() => console.log('billing')}>
              Оплата
            </Button>
            <Button fullWidth appearance='transparent' variant='secondary' onClick={() => console.log('logout')}>
              Выйти
            </Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const InlineForm: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button>Переименовать</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Переименование
          </Heading>
          <Text asChild size={2}>
            <p>Введите новое название и сохраните</p>
          </Text>
          <TextField style={{ marginBlock: 12 }}>
            <TextFieldInput placeholder='Документ' />
          </TextField>
          <Button size='sm' onClick={() => console.log('save rename')}>Сохранить</Button>
        </PopoverContent>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Правила</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Памятка
          </Heading>
          <Text asChild size={2}>
            <p>Popover лучше использовать для короткого контента. Если внутри появляется длинный текст, списки и сложные
              формы — вероятно, вам нужен Dialog / Drawer.</p>
          </Text>
          <Separator style={{ marginBlock: 12 }} />
          <Text size={2}>
            • Закрытие по клику вне <br />
            • Escape для закрытия <br />
            • Логичный порядок табуляции
          </Text>
          <Button variant='secondary' appearance='transparent' onClick={() => console.log('ok')}>
            Ок
          </Button>
        </PopoverContent>
      </>
    ),
  },
};

export const NestedPopover: Story = {
  args: {
    children: (
      <>
        <PopoverTrigger asChild>
          <Button variant='secondary'>Открыть меню</Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Меню
          </Heading>
          <Text asChild size={2}>
            <p>Внутри есть ещё один popover</p>
          </Text>
          
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Popover>
              <PopoverTrigger asChild>
                <Button appearance='transparent' variant='secondary'>
                  Ещё…
                </Button>
              </PopoverTrigger>
              <PopoverContent style={contentSx}>
                <Text size={3}>Вложенный</Text>
                <div style={actionsListSx}>
                  <Button appearance='transparent' variant='secondary' onClick={() => console.log('nested action 1')}>
                    Действие 1
                  </Button>
                  <Button appearance='transparent' variant='secondary' onClick={() => console.log('nested action 2')}>
                    Действие 2
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button onClick={() => console.log('primary action')}>Основное</Button>
          </div>
        </PopoverContent>
      </>
    ),
  },
};

export const ControlledExample: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='secondary' onClick={() => setOpen(!open)}>
            {open ? 'Закрыть' : 'Открыть'} Popover
          </Button>
        </PopoverTrigger>
        <PopoverBackdrop />
        <PopoverContent style={contentSx}>
          <Heading size={4} fontWeight={600} as='h3'>
            Контролируемый
          </Heading>
          <Text asChild size={2}>
            <p>Управляем состоянием извне через open/onOpenChange</p>
          </Text>
          <Separator style={{ marginBlock: 12 }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button variant='secondary' appearance='transparent' onClick={() => setOpen(false)}>
              Готово
            </Button>
            <Button onClick={() => setOpen(false)}>Закрыть</Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
