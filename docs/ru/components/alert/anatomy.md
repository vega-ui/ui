# Alert: анатомия

## Обзор

`Alert` — [составной компонент](../../glossary.md#составной-компонент-compound-component): корень, иконка, заголовок и текст работают вместе как единый паттерн сообщения с общим контекстом семантического варианта.

## Обязательные части

### `Alert`

Обязательна. Отвечает за семантический вариант и внешний вид.

### `AlertMain`

Обязательна в большинстве продуктовых алертов. Оборачивает иерархию сообщения.

## Необязательные части

### `AlertIcon`

Необязательная иконка сообщения. Иконке из дочерних элементов она задаёт размер алерта и цвет его `variant`, но не выбирает её: передайте подходящую варианту, например иконку информации, предупреждения или галочку из любого набора иконок. [Рецепт](./index.md#свой-компонент) выбирает её по `variant` один раз для всего приложения.

### `AlertTitle`

Необязательный заголовок для более сильного акцента.

### `AlertContent`

Необязательный поясняющий текст сообщения.

## Порядок композиции

1. `Alert`
2. `AlertIcon`
3. `AlertMain`
4. `AlertTitle`
5. `AlertContent`

## Корректные варианты композиции

<!-- example: alert/variants.tsx -->
```tsx
import { Alert, AlertContent, AlertIcon, AlertMain, AlertTitle } from '@vega-ui/react';
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TriangleAlertIcon } from '@vega-ui/icons';

export default function Variants() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)', width: '100%', maxWidth: 560 }}>
      <Alert variant='info'>
        <AlertIcon><InfoIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Scheduled maintenance</AlertTitle>
          <AlertContent>The dashboard will be read-only on Sunday from 02:00 to 03:00 UTC.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='success'>
        <AlertIcon><CircleCheckIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Domain verified</AlertTitle>
          <AlertContent>Emails from billing@northwind.io will now pass SPF and DKIM checks.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='warning'>
        <AlertIcon><TriangleAlertIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Storage almost full</AlertTitle>
          <AlertContent>You have used 46.2 GB of 50 GB. Uploads stop when the limit is reached.</AlertContent>
        </AlertMain>
      </Alert>
      <Alert variant='error' appearance='surface'>
        <AlertIcon><CircleAlertIcon /></AlertIcon>
        <AlertMain>
          <AlertTitle>Card declined</AlertTitle>
          <AlertContent>The payment for invoice INV-2048 was declined by the bank. Update the card to keep your plan.</AlertContent>
        </AlertMain>
      </Alert>
    </div>
  );
}
```
<!-- /example -->

## Некорректные варианты композиции

### Alert в роли каркаса всей страницы

Алерты — это сообщения обратной связи, а не замена структуре страницы.

### Длинный сценарий с множеством действий внутри алерта

Когда содержимое превращается в полноценную задачу, обычно лучше подходит другой паттерн.
