# Dialog: стилизация

## Обзор

Стилизация `Dialog` намеренно лёгкая. Большая часть внешнего вида задаётся токенами поверхностей на уровне темы и несколькими правилами раскладки содержимого.

## Публичные CSS-переменные

Текущая реализация не предоставляет большого задокументированного набора переменных `--dialog-*`. Основные точки стилизации — глобальные семантические переменные.

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--surface-primary` | `DialogContent` | основная поверхность диалога |
| `--surface-shadow` | `DialogContent` | тень приподнятой поверхности при `data-shadowed='true'` |
| `--spacing-14` / `--spacing-12` | `DialogContent` | внутренние отступы |
| `--radius-6` | `DialogContent` | скругление углов |

## Переменные частей

### Содержимое

[DialogContent](../../../../packages/ui/src/Dialog/components/DialogContent/style.module.css) использует:

- `--surface-primary`
- `--surface-shadow`
- токены отступов для внутренних отступов
- токены скругления для формы

### Подложка

Подложка — это `::backdrop` элемента `DialogContent`. Она использует `--overlay` при `data-overlay='true'` и размытие при `data-blurred='true'`. Стилизуйте её через класс `DialogContent`:

<!-- example: dialog/backdrop.css -->
```css
.my-dialog::backdrop {
  background: rgb(0 0 0 / 0.6);
}
```
<!-- /example -->

## Взаимодействие состояний и вариантов

- `data-shadowed='true'` включает `--surface-shadow`
- `data-status='close'` управляет переходом закрытия; переход открытия начинается из `@starting-style`
- `data-blurred='true'` размывает страницу за диалогом
- `data-overlay='true'` затемняет страницу за диалогом

## Примеры

### Настройка поверхности на уровне темы

<!-- example: dialog/theme-level-surface-customization.css -->
```css
.brand-theme {
  --surface-primary: oklch(99.2% 0.006 80);
  --surface-shadow: 0 20px 60px oklch(20% 0.02 60 / 0.18);
}
```
<!-- /example -->

### Полноэкранный диалог

Растяните `DialogContent` на весь экран через `style` или `className`.

<!-- example: dialog/full-screen-dialog.tsx -->
```tsx
import { useId, type CSSProperties } from 'react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Heading,
  Icon,
  IconButton,
  Label,
  TextArea,
  TextField,
  TextFieldInput,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const fullScreen = { width: '100%', maxWidth: 'none', height: '100%', maxHeight: 'none', margin: 0, overflow: 'auto', borderRadius: 0 } as CSSProperties;

export default function FullScreenDialog() {
  const titleId = useId();
  const subjectId = useId();
  const bodyId = useId();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Compose message</Button>
      </DialogTrigger>
      <DialogContent aria-labelledby={titleId} style={fullScreen}>
        <div style={{ display: 'grid', maxWidth: 720, marginInline: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>New message to the design team</Heading>
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
          <form method='dialog' style={{ display: 'grid', gap: 'var(--spacing-8)', marginBlockStart: 'var(--spacing-8)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={subjectId}>Subject</Label>
              <TextField>
                <TextFieldInput id={subjectId} name='subject' required autoFocus />
              </TextField>
            </div>
            <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
              <Label htmlFor={bodyId}>Message</Label>
              <TextArea id={bodyId} name='body' rows={12} fullWidth required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBlockStart: 'var(--spacing-4)' }}>
              <Button type='submit'>Send</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```
<!-- /example -->

### Шапка в стиле Apple

Шапка с небольшим заголовком и круглой кнопкой закрытия 24px в углу — это обычная композиция: `Heading` с `size={4}` и `fontWeight={600}` и `DialogClose asChild` вокруг `IconButton`, абсолютно позиционированной в верхнем конечном углу (`position: absolute`, `insetBlockStart: 16`, `insetInlineEnd: 16`); содержащим блоком служит открытый модальный `<dialog>`. У `IconButton` нет для этого опции размера или формы; круглая кнопка 24px получается из двух CSS-переменных, заданных на ней, — `--icon-button-size: 24px` и `--icon-button-br-ratio: 0.5`, — с `Icon size='xs'` внутри.

## Не переопределяйте

- не считайте внутренние data-атрибуты широким публичным API стилизации
- не убирайте визуальный контраст между подложкой и поверхностью содержимого
- не переопределяйте стили диалога так, чтобы ломалась видимость фокуса или удобство прокрутки
