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

## Примеры

### Размеры поля

`size` на корне задаёт высоту, отступы и размер шрифта унаследованной поверхности `TextField`: `sm`, `md` (по умолчанию) или `lg`.

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
