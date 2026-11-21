# Toast

## Профиль документа

`advanced interactive`

## Кратко

`Toast` — короткое сообщение о том, что случилось вдали от фокуса пользователя: разговор отправлен в архив с возможностью отмены, файл не загрузился или кто-то другой что-то изменил. Тосты хранит очередь, которую вы один раз создаёте через `createToastQueue()`, а `add()` показывает тост откуда угодно, из React и без него. `ToastRegion` показывает тосты очереди как именованную live-область поверх страницы, в том числе поверх модального диалога, и рендерит свои дочерние элементы по одному разу на тост как шаблон, который читает тост через `useToastContext()`. `Toast` — один тост, который скринридер читает, когда тот появляется, а `ToastClose` его закрывает. Тосты складываются в колоду, которая раскрывается под указателем или фокусом, ставят таймеры на паузу, пока пользователь на них или вне страницы, и закрываются свайпом или Escape. Библиотека не рисует иконок и не ставит подписей: вид, иконки и имена — ваши.

## Импорт

```tsx
import {
  Toast,
  ToastRegion,
  ToastClose,
  createToastQueue,
  useToastContext,
  type ToastProps,
  type ToastRegionProps,
  type ToastPlacement,
  type ToastCloseProps,
  type ToastContextState,
  type ToastQueue,
  type ToastOptions,
  type QueuedToast,
  type SwipeDirection,
} from '@vega-ui/react';
```

## Экспортируемые типы

- `ToastProps`
- `ToastRegionProps`
- `ToastPlacement`
- `ToastCloseProps`
- `ToastContextState`
- `ToastQueue`
- `ToastOptions`
- `QueuedToast`
- `SwipeDirection`

## Минимальная композиция

<!-- example: toast/minimal-composition.tsx -->
```tsx
import { Button, Text, Toast, ToastClose, ToastRegion, createToastQueue, useToastContext } from '@vega-ui/react';

const toasts = createToastQueue<string>();

function Message() {
  const { content } = useToastContext<string>();

  return (
    <Toast style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
      <Text size={2} fontWeight={500}>{content}</Text>
      <ToastClose asChild>
        <Button size='xs' variant='secondary' appearance='ghost'>Dismiss</Button>
      </ToastClose>
    </Toast>
  );
}

export default function MinimalComposition() {
  return (
    <>
      <Button size='xs' onClick={() => toasts.add('Changes saved', { timeout: 5000 })}>Save changes</Button>
      <ToastRegion queue={toasts} aria-label='Notifications'>
        <Message />
      </ToastRegion>
    </>
  );
}
```
<!-- /example -->

## Свой компонент

Минимальная композиция выше показывает части на месте. В приложении создайте очередь один раз в отдельном модуле, например `toasts.ts`, соберите шаблон один раз со своим набором иконок и отрендерите область один раз рядом с корнем, чтобы любой экран, стор или обработчик запроса показывал тост через `notices.add()`. `notices` — очередь объектов `Notice`. `MyToastRegion` передаёт свои пропсы в `ToastRegion`, включая `aria-label` области, и рендерит `MyToast` как шаблон. `MyToast` читает тост через `useToastContext()`, называет его по заголовку через `aria-labelledby`, делает ошибку `role="alert"`, рендерит действие уведомления как `ToastClose`, который выполняет его и закрывает тост, и кнопку закрытия с иконкой, которая берёт `aria-label` из пропа `dismissLabel`. См. [Рецепты компонентов](../../recipes.md).

<!-- example: toast/recipe.tsx -->
```tsx
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactElement } from 'react';
import {
  Button,
  Icon,
  Spinner,
  Text,
  Toast,
  ToastClose,
  ToastRegion,
  createToastQueue,
  useToastContext,
  type ToastRegionProps,
} from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, FileTextIcon, InfoIcon, TriangleAlertIcon, XIcon } from '@vega-ui/icons';

type Tone = 'success' | 'info' | 'warning' | 'error' | 'loading'

export interface Notice {
  title: string
  description?: string
  tone?: Tone
  action?: { label: string, onAction: () => void }
}

export const notices = createToastQueue<Notice>();

const muted: CSSProperties = { color: 'var(--label-secondary)' };
const closeStyle = { flexShrink: 0, '--button-height': '24px', '--button-br-ratio': 0.5 } as CSSProperties;
const topCorner: CSSProperties = { alignSelf: 'flex-start', marginBlock: 'var(--spacing-2)' };

const tones: Record<Exclude<Tone, 'loading'>, { icon: ReactElement, color: string }> = {
  success: { icon: <CircleCheckIcon />, color: 'var(--color-green-accent-500)' },
  info: { icon: <InfoIcon />, color: 'var(--color-blue-accent-500)' },
  warning: { icon: <TriangleAlertIcon />, color: 'var(--color-amber-accent-500)' },
  error: { icon: <CircleAlertIcon />, color: 'var(--color-red-accent-500)' },
};

const smallIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, height: 'var(--spacing-16)' };
const largeIcon: CSSProperties = { display: 'grid', placeItems: 'center', flexShrink: 0, alignSelf: 'flex-start', height: 'var(--spacing-12)', marginBlock: 'var(--spacing-2)', marginInlineEnd: 'var(--spacing-2)' };

function ToneIcon({ tone, large }: { tone: Tone, large: boolean }) {

  if (tone === 'loading') {
    return (
      <span aria-hidden='true' style={large ? largeIcon : smallIcon}>
        <Spinner size={3} />
      </span>
    );
  }

  return (
    <span aria-hidden='true' style={{ ...(large ? largeIcon : smallIcon), color: tones[tone].color }}>
      <Icon size='sm'>{tones[tone].icon}</Icon>
    </span>
  );
}

function MyToast({ dismissLabel }: { dismissLabel: string }) {
  const { content } = useToastContext<Notice>();
  const titleId = useId();
  const action = content.action && (
    <ToastClose asChild onClick={content.action.onAction}>
      <Button
        size='xs'
        variant='primary'
        appearance='ghost'
        style={{ flexShrink: 0, justifySelf: 'start', marginBlockStart: content.description ? 'var(--spacing-4)' : undefined }}
      >
        {content.action.label}
      </Button>
    </ToastClose>
  );

  return (
    <Toast
      role={content.tone === 'error' ? 'alert' : 'status'}
      aria-labelledby={titleId}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}
    >
      {content.tone && <ToneIcon tone={content.tone} large={Boolean(content.description)} />}
      <div style={{ display: 'grid', flex: 1, minWidth: 0, paddingBlock: 'var(--spacing-2)' }}>
        <Text id={titleId} size={2} fontWeight={500}>{content.title}</Text>
        {content.description && <Text size={2} style={muted}>{content.description}</Text>}
        {content.description && action}
      </div>
      {!content.description && action}
      <ToastClose asChild>
        <Button
          square
          size='xs'
          aria-label={dismissLabel}
          variant='secondary'
          appearance='ghost'
          style={content.description ? { ...closeStyle, ...topCorner } : closeStyle}
        >
          <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
        </Button>
      </ToastClose>
    </Toast>
  );
}

interface MyToastRegionProps extends Omit<ToastRegionProps<Notice>, 'queue' | 'children'> {
  dismissLabel: string
}

export function MyToastRegion({ dismissLabel, ...props }: MyToastRegionProps) {
  return (
    <ToastRegion queue={notices} {...props}>
      <MyToast dismissLabel={dismissLabel} />
    </ToastRegion>
  );
}

export default function Recipe() {
  const [trashed, setTrashed] = useState(false);
  const publishing = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(publishing.current), []);

  const moveToTrash = () => {
    setTrashed(true);
    notices.add(
      { title: 'Moved to Trash', description: 'Launch plan', action: { label: 'Undo', onAction: () => setTrashed(false) } },
      { timeout: 6000 },
    );
  };

  const publish = () => {
    const progress = notices.add({ title: 'Publishing Launch plan…', tone: 'loading' });
    publishing.current = setTimeout(() => {
      notices.close(progress);
      notices.add({
        title: 'Could not publish',
        description: 'You are offline. Your changes are kept on this device.',
        tone: 'error',
        action: { label: 'Try again', onAction: publish },
      });
    }, 1500);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-6)',
          boxSizing: 'border-box',
          width: '100%',
          maxWidth: 400,
          padding: 'var(--spacing-6) var(--spacing-6) var(--spacing-6) var(--spacing-8)',
          background: 'var(--surface-primary)',
          border: '1px solid var(--separator-opaque)',
          borderRadius: 'var(--radius-5)',
        }}
      >
        <Icon size='lg' style={muted}><FileTextIcon /></Icon>
        <div style={{ display: 'grid', flex: 1, minWidth: 0 }}>
          <Text size={3} fontWeight={500}>Launch plan</Text>
          <Text size={2} style={muted}>{trashed ? 'In Trash' : 'Edited 5 min ago'}</Text>
        </div>
        {trashed ? (
          <Button size='xs' variant='secondary' appearance='ghost' onClick={() => setTrashed(false)}>Restore</Button>
        ) : (
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            <Button size='xs' variant='secondary' appearance='ghost' onClick={moveToTrash}>Move to Trash</Button>
            <Button size='xs' onClick={publish}>Publish</Button>
          </div>
        )}
      </div>
      <MyToastRegion aria-label='Notifications' dismissLabel='Dismiss' />
    </>
  );
}
```
<!-- /example -->

## Обязательные части

- `createToastQueue()`: очередь, созданная один раз вне React; `add(content, { timeout })` показывает тост и возвращает его ключ, `close(key)` закрывает его
- `ToastRegion`: именованная live-область `role="region"` в верхнем слое, которая показывает тосты очереди; рендерится один раз
- `Toast`: один тост, корень шаблона, по умолчанию `role="status"`

## Необязательные части

- `ToastClose`: кнопка, которая закрывает свой тост после вашего `onClick`, или через `asChild` ваша кнопка, например Undo или кнопка закрытия с иконкой
- `useToastContext()`: содержимое, ключ, место в стопке и `close()` тоста, которые читает шаблон

## Порядок композиции

1. `createToastQueue()` в модуле, вне компонентов
2. `ToastRegion` с `queue` и `aria-label`, один раз, рядом с корнем приложения
3. Шаблон как дочерний элемент области: ваш компонент, который вызывает `useToastContext()`
4. `Toast` в корне шаблона
5. Текст, иконки и кнопки `ToastClose` внутри `Toast`

## Варианты

- `role="status"` (по умолчанию) для новостей, которые могут подождать, `role="alert"` для срочного тоста, например ошибки
- С `timeout` в `add()` тост закрывается сам; без него он остаётся, пока его не закроют. Таймаута по умолчанию нет.
- `placement` у области: `top-start`, `top`, `top-end` (по умолчанию), `bottom-start`, `bottom` или `bottom-end`; начало и конец строки следуют направлению страницы, а на экране шириной до 40rem тосты всегда по центру
- `limit` у области: сколько самых новых тостов видно одновременно, по умолчанию 3
- `swipeDirections` у области: направления, в которых свайп закрывает тост, по умолчанию к краю, у которого стоят тосты, и к ближнему боковому краю
- Содержимое любой формы: очередь типизируется своим содержимым, например `createToastQueue<Notice>()`, а вид решает шаблон

## Связанные документы

- [Анатомия](./anatomy.md)
- [Примеры](./examples.md)
- [Паттерны](./patterns.md)
- [API](./api.md)
- [Стилизация](./styling.md)
- [Доступность](./accessibility.md)
- [Сравнение](./comparison.md)
- [Решение проблем](./troubleshooting.md)

## Пограничные случаи

- Таймеры встают на паузу, пока указатель на тостах, пока фокус внутри них, пока у окна нет фокуса и пока вкладка скрыта, а потом идут дальше с оставшимся временем. Страница в iframe без фокуса, например превью, сохраняет свои тосты, пока пользователь к ней не вернётся.
- Поверх открытого модального `<dialog>`, включая `Dialog`, `Drawer` и `Sheet`, область переезжает в диалог, поэтому тосты остаются над ним, а пользователь может нажимать их и переводить на них фокус. Когда диалог закрывается, область возвращается обратно.
- Область показывает `limit` самых новых тостов. Более старые ждут с таймерами на паузе и появляются, когда показанные закрываются.
- Когда закрывается тост в фокусе, фокус переходит в следующий тост, а после последнего возвращается на элемент, который был в фокусе до того, как фокус вошёл в тосты.
- Область есть в документе до первого тоста, поэтому скринридер читает и первый тост.
- У тостов `user-select: none`, чтобы свайп мышью не выделял текст. Не кладите в тост текст, который пользователю нужно скопировать, например код.
- При уменьшенном движении тосты только проявляются и исчезают.
- На экране шириной до 40rem область стоит по центру сверху, на более широком — в правом верхнем углу. Других положений в этой версии нет.
- У очереди нет `update`: чтобы изменить тост, закройте его и добавьте новый.
- Горячей клавиши, которая переносит фокус в тосты, нет; см. [рецепт горячей клавиши](./patterns.md#горячая-клавиша-к-новейшему-тосту).

## Частые ошибки

- Создание очереди внутри компонента: каждый рендер создавал бы новую пустую очередь. Создайте её один раз в модуле и импортируйте.
- `ToastRegion` на каждом экране или рядом с каждой кнопкой, которая добавляет тост: отрендерите её один раз рядом с корнем, `add()` дотянется до неё откуда угодно.
- `ToastRegion` без `aria-label`: у ориентира нет имени, а компоненты сами подписи не ставят.
- Единственный путь к действию — в тосте: тост может закрыться по таймауту, уйти свайпом или остаться незамеченным. У каждого действия тоста, например Undo или Retry, должен быть второй путь, например кнопка Move to inbox в списке.
- Тост как ответ на то, что пользователь только что сделал на месте, например на сохранённое поле или скопированную ссылку: сначала покажите обратную связь на месте; тост — для того, что происходит вдали от фокуса.
- Короткий таймаут у ошибки или у тоста с действием: ошибкам не давайте таймаута, а действиям — достаточно времени, чтобы прочитать и дотянуться.
- Поиск `ToastTitle` или `ToastDescription`: назовите тост через `aria-labelledby`, указывающий на ваш заголовок.
