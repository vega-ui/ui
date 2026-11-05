# PinField: примеры

## Базовый

### Базовый: стандартный 4-значный PIN

Видимая `Label` ссылается на `PinFieldInput` — единственное скрытое поле, которое хранит код; слоты только показывают его символы. Подсказка связана через `aria-describedby`, а плейсхолдер заполняет пустые слоты.

<!-- example: pin-field/standard-4-digit-pin.tsx -->
```tsx
import { HelperText, Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function Standard4DigitPin() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>New card PIN</Label>
      <PinField placeholder='••••' maxLength={4}>
        <PinFieldInput id={id} name='pin' autoComplete='off' aria-describedby={`${id}-hint`} />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
      <HelperText id={`${id}-hint`}>Avoid birthdays and repeated digits like 1111.</HelperText>
    </div>
  );
}
```
<!-- /example -->

## Контролируемый/с состоянием

### Контролируемый/с состоянием: код активации в верхнем регистре

Маска принимает буквы и цифры, а родитель хранит код заглавными, меняя его в `onChangeValue`. Подсказка считает, сколько символов осталось.

<!-- example: pin-field/alphanumeric-activation-code.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSlot, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

export default function AlphanumericActivationCode() {
  const id = useId();
  const [code, setCode] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Activation code from the box</Label>
      <PinField
        mask={/^[A-Za-z0-9]+$/}
        maxLength={5}
        value={code}
        onChangeValue={(next) => setCode(next.toUpperCase())}
      >
        <PinFieldInput id={id} inputMode='text' autoCapitalize='characters' autoComplete='off' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
      </PinField>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {code.length === 5 ? `Ready to activate ${code}.` : `${5 - code.length} characters left.`}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Контролируемый/с состоянием: очистка кода после неудачной проверки

Родитель проверяет код, как только введена четвёртая цифра. Неверный код очищается, чтобы можно было ввести его заново, счётчик попыток уменьшается, а после последней попытки поле отключается.

<!-- example: pin-field/clear-the-code-after-a-failed-check.tsx -->
```tsx
import { HelperText, Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useId, useState } from 'react';

const correctCode = '2468';

export default function ClearTheCodeAfterAFailedCheck() {
  const id = useId();
  const [code, setCode] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [unlocked, setUnlocked] = useState(false);

  const onChangeValue = (next: string) => {
    if (next.length < 4) {
      setCode(next);
      return;
    }

    if (next === correctCode) {
      setCode(next);
      setUnlocked(true);
      return;
    }

    setCode('');
    setAttemptsLeft((current) => current - 1);
  };

  const failed = attemptsLeft < 3 && !unlocked;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Enter your app passcode (try 2468)</Label>
      <PinField
        maxLength={4}
        value={code}
        onChangeValue={onChangeValue}
        error={failed}
        disabled={unlocked || attemptsLeft === 0}
      >
        <PinFieldInput
          id={id}
          autoComplete='off'
          aria-invalid={failed}
          aria-describedby={`${id}-status`}
        />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
      <HelperText id={`${id}-status`} error={failed} role='status'>
        {unlocked && 'Unlocked.'}
        {!unlocked && attemptsLeft === 3 && 'Checked as soon as all four digits are in.'}
        {!unlocked && attemptsLeft < 3 && attemptsLeft > 0 && `Wrong passcode. ${attemptsLeft} attempts left.`}
        {!unlocked && attemptsLeft === 0 && 'Too many attempts. Sign in with your password instead.'}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: 6-значный одноразовый код

`PinFieldInput` — настоящее поле ввода: `name` кладёт код в `FormData`, `required` и `pattern` дают нативную валидацию, `autoComplete='one-time-code'` позволяет браузеру подставить код из SMS, а кнопка сброса очищает его.

<!-- example: pin-field/6-digit-otp.tsx -->
```tsx
import { Button, Label, PinField, PinFieldInput, PinFieldSlot, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function Example6DigitOtp() {
  const id = useId();
  const [submitted, setSubmitted] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('otp')));
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={() => setSubmitted('')}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}
    >
      <Label htmlFor={id}>Code from the SMS sent to +1 ••• ••• 0132</Label>
      <PinField maxLength={6}>
        <PinFieldInput id={id} name='otp' autoComplete='one-time-code' required pattern='\d{6}' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-4)', marginBlockStart: 'var(--spacing-9)' }}>
        <Button type='reset' variant='secondary' appearance='ghost'>Clear</Button>
        <Button type='submit'>Verify</Button>
      </div>
      {submitted && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums', marginBlockStart: 'var(--spacing-4)' }}>
          Submitted otp={submitted}
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: сгруппированный код с разделителем

Шесть слотов разбиты по три, как код в приложении-аутентификаторе. `PinFieldSeparator` только визуальный: значение по-прежнему шесть цифр без дефиса.

<!-- example: pin-field/grouped-code-with-separator.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function GroupedCodeWithSeparator() {
  const id = useId();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from your authenticator app</Label>
      <PinField maxLength={6}>
        <PinFieldInput id={id} name='totp' autoComplete='one-time-code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSeparator />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
    </div>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: неверный код подтверждения

Форма проверяет код при отправке: короткий или неверный код ставит `error` на поле и связывает сообщение с полем ввода через `aria-describedby`. Любое изменение снимает сообщение.

<!-- example: pin-field/wrong-verification-code.tsx -->
```tsx
import { Button, HelperText, Label, PinField, PinFieldInput, PinFieldSlot, Text } from '@vega-ui/react';
import { FormEvent, useId, useState } from 'react';

export default function WrongVerificationCode() {
  const id = useId();
  const errorId = `${id}-error`;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);

  const onChangeValue = (next: string) => {
    setCode(next);
    setError('');
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.length < 6) {
      setError('Enter all 6 digits of the code.');
      return;
    }

    if (code !== '135790') {
      setError('This code is wrong or has expired. Check the latest email or request a new code.');
      return;
    }

    setVerified(true);
  };

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Code from the email (135790 passes)</Label>
      <PinField maxLength={6} value={code} onChangeValue={onChangeValue} error={error !== ''}>
        <PinFieldInput
          id={id}
          autoComplete='one-time-code'
          aria-describedby={error === '' ? undefined : errorId}
        />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
      </PinField>
      {error !== '' && <HelperText id={errorId} error>{error}</HelperText>}
      <Button type='submit' style={{ alignSelf: 'flex-end', marginBlockStart: 'var(--spacing-9)' }}>Confirm email</Button>
      {verified && (
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', marginBlockStart: 'var(--spacing-4)' }}>
          Email confirmed.
        </Text>
      )}
    </form>
  );
}
```
<!-- /example -->

## Отключённый

### Отключённый: заблокированный ввод кода

После слишком многих попыток поле отключается на 30 секунд, а обратный отсчёт связан с полем ввода. `disabled` ставится на `PinField`, который передаёт его полю ввода и слотам.

<!-- example: pin-field/locked-code-entry.tsx -->
```tsx
import { HelperText, Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useEffect, useId, useState } from 'react';

export default function LockedCodeEntry() {
  const id = useId();
  const [secondsLeft, setSecondsLeft] = useState(30);
  const locked = secondsLeft > 0;

  useEffect(() => {
    if (!locked) return undefined;

    const timer = setTimeout(() => setSecondsLeft((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [locked, secondsLeft]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>Verification code</Label>
      <PinField maxLength={4} disabled={locked}>
        <PinFieldInput id={id} autoComplete='one-time-code' aria-describedby={`${id}-hint`} />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
      <HelperText id={`${id}-hint`} style={{ fontVariantNumeric: 'tabular-nums' }}>
        {locked ? `Too many attempts. Try again in ${secondsLeft} s.` : 'You can enter the code again.'}
      </HelperText>
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: сгруппированный 8-символьный код

Маска-массив задаёт шаблон для каждой позиции: четыре буквы, затем четыре цифры. Вставленный код заполняет все слоты сразу, а разделитель не попадает в значение.

<!-- example: pin-field/grouped-8-character-code.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSeparator, PinFieldSlot, Text } from '@vega-ui/react';
import { useId, useState } from 'react';

const letter = /[A-Za-z]/;
const digit = /\d/;

export default function Grouped8CharacterCode() {
  const id = useId();
  const [code, setCode] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 340 }}>
      <Label htmlFor={id}>Gift card code (4 letters, then 4 digits)</Label>
      <PinField
        size='sm'
        maxLength={8}
        mask={[letter, letter, letter, letter, digit, digit, digit, digit]}
        value={code}
        onChangeValue={(next) => setCode(next.toUpperCase())}
      >
        <PinFieldInput id={id} inputMode='text' autoCapitalize='characters' autoComplete='off' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
        <PinFieldSeparator />
        <PinFieldSlot index={4} />
        <PinFieldSlot index={5} />
        <PinFieldSlot index={6} />
        <PinFieldSlot index={7} />
      </PinField>
      <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>
        {code.length === 8 ? `Redeem ${code.slice(0, 4)}-${code.slice(4)}` : 'Paste the whole code or type it.'}
      </Text>
    </div>
  );
}
```
<!-- /example -->

### Пограничный случай: код на странице справа налево

Коды и в арабском, и в иврите читаются слева направо, поэтому полю задан `dir='ltr'`, а метка остаётся справа налево.

<!-- example: pin-field/rtl-layout.tsx -->
```tsx
import { Label, PinField, PinFieldInput, PinFieldSlot } from '@vega-ui/react';
import { useId } from 'react';

export default function RtlLayout() {
  const id = useId();

  return (
    <div dir='rtl' lang='ar' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start', width: '100%', maxWidth: 320 }}>
      <Label htmlFor={id}>رمز التحقق</Label>
      <PinField dir='ltr' maxLength={4}>
        <PinFieldInput id={id} autoComplete='one-time-code' />
        <PinFieldSlot index={0} />
        <PinFieldSlot index={1} />
        <PinFieldSlot index={2} />
        <PinFieldSlot index={3} />
      </PinField>
    </div>
  );
}
```
<!-- /example -->
