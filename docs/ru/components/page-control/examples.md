# PageControl: примеры

## Базовый

### Базовый: индикаторы карусели, связанные со слайдом

Активный индекс хранится в состоянии и управляет и точками, и видимым слайдом. У каждой точки есть `id`, `aria-label` с позицией и `aria-controls`, указывающий на панель слайда, — это `tabpanel`, подписанный активной точкой.

<!-- example: page-control/carousel-indicators.tsx -->
```tsx
import { Card, Heading, PageControl, PageControlItem, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

const slides = [
  { title: 'Plan your week', text: 'Drag tasks onto the calendar and see your free time at a glance.' },
  { title: 'Share with your team', text: 'Invite teammates to a board and assign tasks in one click.' },
  { title: 'Stay on track', text: 'Get a summary every Monday with what slipped and what is next.' },
];

export default function CarouselIndicators() {
  const prefix = useId();
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <Card size='sm' style={{ display: 'grid', gap: 'var(--spacing-10)', justifyItems: 'center', width: '100%' }}>
      <div
        role='tabpanel'
        id={`${prefix}-panel`}
        aria-labelledby={`${prefix}-tab-${active}`}
        style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-3)', minHeight: 96, textAlign: 'center' }}
      >
        <Heading as='h3' size={4} fontWeight={600}>{slide.title}</Heading>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>{slide.text}</Text>
      </div>
      <PageControl active={active} onChangeActive={setActive} aria-label='Feature tour'>
        {slides.map((item, index) => (
          <PageControlItem
            key={item.title}
            index={index}
            id={`${prefix}-tab-${index}`}
            aria-controls={`${prefix}-panel`}
            aria-label={`${item.title}, ${index + 1} of ${slides.length}`}
          />
        ))}
      </PageControl>
    </Card>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: внешние кнопки «назад» и «вперёд»

Одно и то же значение `active` меняется из трёх мест: точками, стрелками на клавиатуре внутри точек и кнопками-иконками по бокам. Подпись сверху показывает текущее фото и его позицию, а на краях кнопки отключены.

<!-- example: page-control/controlled-active-index.tsx -->
```tsx
import { ChevronLeft, ChevronRight } from '@vega-ui/icons';
import { Icon, IconButton, PageControl, PageControlItem, Text } from '@vega-ui/react';
import { useState } from 'react';

const photos = ['Lisbon tram', 'Sintra palace', 'Cascais beach', 'Porto bridge', 'Douro valley'];

export default function ControlledActiveIndex() {
  const [active, setActive] = useState(0);

  const isFirst = active === 0;
  const isLast = active === photos.length - 1;

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Text size={3} fontWeight={500} aria-live='polite' style={{ fontVariantNumeric: 'tabular-nums' }}>
        {photos[active]} · {active + 1} / {photos.length}
      </Text>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
        <IconButton aria-label='Previous photo' variant='secondary' appearance='ghost' size='sm' disabled={isFirst} onClick={() => setActive(active - 1)}>
          <Icon><ChevronLeft /></Icon>
        </IconButton>
        <PageControl active={active} onChangeActive={setActive} aria-label='Photos'>
          {photos.map((photo, index) => (
            <PageControlItem key={photo} index={index} aria-label={photo} />
          ))}
        </PageControl>
        <IconButton aria-label='Next photo' variant='secondary' appearance='ghost' size='sm' disabled={isLast} onClick={() => setActive(active + 1)}>
          <Icon><ChevronRight /></Icon>
        </IconButton>
      </div>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: точки шагов над многошаговой формой

Одна `<form>` и скрытый `<fieldset>` на каждый шаг. Continue проверяет только текущий шаг через `reportValidity`, ещё не пройденные шаги отключены (`disabled`), и `onChangeActive` их тоже игнорирует, так что стрелками нельзя перескочить вперёд. Итоговая отправка читает все шаги через `FormData`.

<!-- example: page-control/step-indicator-above-form-pages.tsx -->
```tsx
import { Button, HelperText, Label, PageControl, PageControlItem, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { FormEvent, MouseEvent, useId, useState } from 'react';

const steps = ['Account', 'Workspace', 'Invite'];

export default function StepIndicatorAboveFormPages() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [result, setResult] = useState('');

  const goTo = (index: number) => {
    if (index > reached) return;
    setStep(index);
  };

  const next = (event: MouseEvent<HTMLButtonElement>) => {
    const fieldset = event.currentTarget.form?.elements.namedItem(`step-${step}`);
    if (!(fieldset instanceof HTMLFieldSetElement)) return;

    const fields = Array.from(fieldset.elements) as HTMLInputElement[];
    const valid = fields.every((field) => field.reportValidity());
    if (!valid) return;

    setStep(step + 1);
    setReached(Math.max(reached, step + 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setResult(`Workspace “${data.get('workspace')}” created for ${data.get('email')}.`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%' }}>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)', justifyItems: 'center' }}>
        <PageControl active={step} onChangeActive={goTo} aria-label='Sign-up steps'>
          {steps.map((label, index) => (
            <PageControlItem
              key={label}
              index={index}
              disabled={index > reached}
              aria-label={`Step ${index + 1}: ${label}`}
            />
          ))}
        </PageControl>
        <Text size={2} style={{ color: 'var(--label-secondary)' }}>Step {step + 1} of {steps.length}: {steps[step]}</Text>
      </div>

      <fieldset name='step-0' hidden={step !== 0} style={{ margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-email`}>Work email</Label>
          <TextField>
            <TextFieldInput id={`${id}-email`} name='email' type='email' autoComplete='email' required />
          </TextField>
        </div>
      </fieldset>

      <fieldset name='step-1' hidden={step !== 1} style={{ margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-workspace`}>Workspace name</Label>
          <TextField>
            <TextFieldInput id={`${id}-workspace`} name='workspace' required minLength={3} />
          </TextField>
        </div>
      </fieldset>

      <fieldset name='step-2' hidden={step !== 2} style={{ margin: 0, padding: 0, border: 'none' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
          <Label htmlFor={`${id}-invite`}>Invite a teammate (optional)</Label>
          <TextField>
            <TextFieldInput id={`${id}-invite`} name='invite' type='email' />
          </TextField>
        </div>
      </fieldset>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type='button' variant='secondary' appearance='ghost' disabled={step === 0} onClick={() => setStep(step - 1)}>
          Back
        </Button>
        {step < steps.length - 1 && <Button type='button' onClick={next}>Continue</Button>}
        {step === steps.length - 1 && <Button type='submit'>Create workspace</Button>}
      </div>
      {result && <HelperText role='status'>{result}</HelperText>}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: диалог «Что нового»

Точки и кнопка Next делят подвал диалога; на последнем шаге Next превращается в кнопку закрытия. При повторном открытии диалог снова начинается с первого обновления.

<!-- example: page-control/whats-new-dialog.tsx -->
```tsx
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  PageControl,
  PageControlItem,
  Text,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';
import { CSSProperties, useId, useState } from 'react';

const updates = [
  { title: 'Dark mode everywhere', text: 'Every screen now follows your system theme, including exported PDFs.' },
  { title: 'Faster search', text: 'Results appear as you type and include archived projects.' },
  { title: 'Keyboard shortcuts', text: 'Press ? anywhere to see the full list of shortcuts.' },
];

export default function WhatsNewDialog() {
  const prefix = useId();
  const [active, setActive] = useState(0);
  const isLast = active === updates.length - 1;

  return (
    <Dialog onChangeOpen={(open) => open && setActive(0)}>
      <DialogTrigger asChild>
        <Button variant='secondary' appearance='ghost'>What’s new</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={`${prefix}-title`} style={{ display: 'grid', gap: 'var(--spacing-10)' }}>
        <div
          role='tabpanel'
          id={`${prefix}-panel`}
          aria-labelledby={`${prefix}-tab-${active}`}
          style={{ display: 'grid', alignContent: 'start', gap: 'var(--spacing-3)', minHeight: 88 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={`${prefix}-title`} as='h2' size={4} fontWeight={600}>{updates[active].title}</Heading>
            <DialogClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DialogClose>
          </div>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>{updates[active].text}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <PageControl active={active} onChangeActive={setActive} aria-label='Updates'>
            {updates.map((update, index) => (
              <PageControlItem
                key={update.title}
                index={index}
                id={`${prefix}-tab-${index}`}
                aria-controls={`${prefix}-panel`}
                aria-label={update.title}
              />
            ))}
          </PageControl>
          {isLast ? (
            <DialogClose asChild>
              <Button size='sm'>Got it</Button>
            </DialogClose>
          ) : (
            <Button size='sm' onClick={() => setActive(active + 1)}>Next</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: автопрокрутка по таймеру с паузой

`PageControlProgress` анимирует активную точку `duration` миллисекунд, а событие `animationend` переключает на следующую историю. Автопрокрутку должно быть можно остановить, поэтому Pause заменяет элементы с таймером обычными точками `PageControlItem` — таймер останавливается, а заголовок становится вежливой живой областью только на время паузы.

<!-- example: page-control/timed-progress-indicators.tsx -->
```tsx
import { Button, PageControl, PageControlItem, PageControlProgress, Text } from '@vega-ui/react';
import { useState } from 'react';

const stories = ['New arrivals', 'Autumn sale', 'Gift cards', 'Store opening'];

export default function TimedProgressIndicators() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = () => setActive((active + 1) % stories.length);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', justifyItems: 'center', width: '100%' }}>
      <Text size={4} fontWeight={600} aria-live={paused ? 'polite' : 'off'}>{stories[active]}</Text>
      <PageControl active={active} onChangeActive={setActive} aria-label='Stories'>
        {stories.map((story, index) => {
          if (paused) {
            return <PageControlItem key={story} index={index} aria-label={story} />;
          }

          return (
            <PageControlProgress
              key={story}
              index={index}
              duration={4000}
              aria-label={story}
              onAnimationEnd={index === active ? advance : undefined}
            />
          );
        })}
      </PageControl>
      <Button size='sm' variant='secondary' appearance='ghost' aria-pressed={paused} onClick={() => setPaused(!paused)}>
        {paused ? 'Resume autoplay' : 'Pause autoplay'}
      </Button>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: тридцать страниц в окне из семи точек

Тридцать точек — это шум, поэтому рендерится только окно из семи вокруг активного элемента, и каждая точка сохраняет свой настоящий `index`. Окно сдвигается вместе с выбором, поэтому стрелками можно дойти до любого фото, а подпись показывает настоящую позицию.

<!-- example: page-control/many-pages-window.tsx -->
```tsx
import { PageControl, PageControlItem, Text } from '@vega-ui/react';
import { useState } from 'react';

const total = 30;
const windowSize = 7;

export default function ManyPagesWindow() {
  const [active, setActive] = useState(0);

  const half = Math.floor(windowSize / 2);
  const first = Math.min(Math.max(active - half, 0), total - windowSize);
  const visible = Array.from({ length: windowSize }, (_, offset) => first + offset);

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', justifyItems: 'center', width: '100%' }}>
      <Text size={3} fontWeight={500} style={{ fontVariantNumeric: 'tabular-nums' }}>Photo {active + 1} of {total}</Text>
      <PageControl active={active} onChangeActive={setActive} aria-label={`Photos, ${total} in total`}>
        {visible.map((index) => (
          <PageControlItem
            key={index}
            index={index}
            aria-label={`Photo ${index + 1} of ${total}`}
          />
        ))}
      </PageControl>
      <Text size={1} style={{ color: 'var(--label-secondary)' }}>Use the arrow keys to move through all {total} photos.</Text>
    </div>
  );
}
```
<!-- /example -->
