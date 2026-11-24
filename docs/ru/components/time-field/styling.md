# TimeField: стилизация

## Обзор

`TimeField` наследует контракт стилизации `TextField`. Его отличие — маска и разбор, а не отдельная визуальная поверхность.

## Публичные CSS-переменные

В текущей реализации нет отдельных публичных переменных `--time-field-*`.

Компонент наследует соответствующие токены поверхности `TextField`:

| Переменная | Где используется | Назначение |
| --- | --- | --- |
| `--input-height` | унаследованные обёртка/поле ввода | высота поля |
| `--fills-tertiary` | унаследованная обёртка | поверхность по умолчанию |
| `--color-primary-500` | унаследованная обёртка | контур фокуса |
| `--color-error` | унаследованная обёртка | контур ошибки |

## Переменные частей

### Корень

Корень — обёртка `TextField`, добавляющая только контекст времени.

### Поле ввода

`TimeFieldInput` — это `TextFieldInput` с маской, наследующий его типографику и отступы.

## Взаимодействие состояний и вариантов

- формат меняет поведение ввода, а не внешний вид
- границы и шаг влияют на логику маски, а не на поверхность
- внешний вид ошибки и отключённого состояния берётся из унаследованного контракта поля/поля ввода
- вид ошибки следует за `aria-invalid='true'`, `:user-invalid` или `[data-user-edited]:invalid` на `TimeFieldInput`

`TimeField` сам записывает текст `TimeFieldInput`, а Chromium и WebKit не считают такой текст правкой пользователя, поэтому после такой правки input не подходит под `:user-invalid`. В своём CSS используйте `:user-invalid` вместе с `[data-user-edited]:invalid`:

```css
.pickup-time:has(input:is(:user-invalid, [data-user-edited]:invalid)) label {
  color: var(--color-error);
}
```

## Примеры

### Размеры поля

`size` на корне задаёт высоту, отступы и размер шрифта унаследованной поверхности `TextField`: `sm`, `md` (по умолчанию) или `lg`. `WheelPicker` в его поповере берёт тот же размер, если у него нет своего `size`.

<!-- example: time-field/field-sizes.tsx -->
```tsx
import { TimeField, TimeFieldInput } from '@vega-ui/react';

export default function FieldSizes() {
  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 200 }}>
      <TimeField size='sm' defaultValue='09:30'>
        <TimeFieldInput aria-label='Small time field' />
      </TimeField>
      <TimeField size='md' defaultValue='09:30'>
        <TimeFieldInput aria-label='Medium time field' />
      </TimeField>
      <TimeField size='lg' defaultValue='09:30'>
        <TimeFieldInput aria-label='Large time field' />
      </TimeField>
    </div>
  );
}
```
<!-- /example -->

## Не переопределяйте

- не рассматривайте смену формата как вопрос стилизации
- не документируйте переменные стилизации времени, которых нет в исходном коде
