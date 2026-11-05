# Avatar: примеры

## Базовый

### Базовый: список участников с фото и инициалами

Имя уже написано рядом с каждым аватаром, поэтому аватар декоративный: `aria-hidden` на корне и `alt=''` у изображения. Участники без фото получают инициалы, а отключённый участник — `variant='secondary'`.

<!-- example: avatar/member-list.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const members = [
  { name: 'Maria Chen', email: 'maria@northwind.io', initials: 'MC', photo: portrait(210), active: true },
  { name: 'Omar Haddad', email: 'omar@northwind.io', initials: 'OH', photo: portrait(28), active: true },
  { name: 'Lena Fischer', email: 'lena@northwind.io', initials: 'LF', photo: '', active: true },
  { name: 'Tom Becker', email: 'tom@northwind.io', initials: 'TB', photo: '', active: false },
];

export default function MemberList() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360 }}>
      {members.map((member) => (
        <li key={member.email} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
          <Avatar size='sm' variant={member.active ? 'primary' : 'secondary'} aria-hidden='true'>
            {member.photo && <AvatarImage src={member.photo} alt='' />}
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div style={{ display: 'grid', minWidth: 0 }}>
            <Text size={2} fontWeight={500}>{member.name}</Text>
            <Text size={1} style={{ color: 'var(--label-secondary)' }}>
              {member.active ? member.email : 'Deactivated'}
            </Text>
          </div>
        </li>
      ))}
    </ul>
  );
}
```
<!-- /example -->

### Базовый: боты, команды и организации

`AvatarIcon` заменяет изображение для сущностей, у которых нет лица или инициалов. `variant='secondary'` визуально отделяет их от людей.

<!-- example: avatar/generic-entities.tsx -->
```tsx
import { Avatar, AvatarIcon, Text } from '@vega-ui/react';
import { Bot, Building2, Users } from '@vega-ui/icons';

export default function GenericEntities() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-6)', width: '100%' }}>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><Bot /></AvatarIcon>
        </Avatar>
        <Text size={3}>Release bot merged 3 pull requests</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><Users /></AvatarIcon>
        </Avatar>
        <Text size={3}>Design team was mentioned in “Q4 roadmap”</Text>
      </li>
      <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
        <Avatar size='sm' variant='secondary' aria-hidden='true'>
          <AvatarIcon><Building2 /></AvatarIcon>
        </Avatar>
        <Text size={3}>Northwind Traders</Text>
      </li>
    </ul>
  );
}
```
<!-- /example -->

## Форма/интеграция

### Форма/интеграция: загрузка фото профиля с превью

Нативное поле выбора файла передаёт object URL в `AvatarImage` для мгновенного превью; URL освобождается при смене. При отправке файл читается из `FormData`, а сброс возвращает инициалы.

<!-- example: avatar/photo-upload.tsx -->
```tsx
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage, Button, Text } from '@vega-ui/react';

export default function PhotoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (preview === '') return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const choose = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
  };

  const remove = () => {
    setPreview('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = new FormData(event.currentTarget).get('avatar');
    if (!(file instanceof File) || file.size === 0) {
      setResult('No photo selected: initials will be used.');
      return;
    }
    setResult(`Uploading ${file.name} (${Math.round(file.size / 1024)} KB)`);
  };

  return (
    <form onSubmit={submit} onReset={remove} style={{ display: 'grid', gap: 'var(--spacing-12)', justifyItems: 'start', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)', minWidth: 0, maxWidth: '100%' }}>
        <Avatar size='xl' role='img' aria-label='Profile photo preview'>
          {preview && <AvatarImage key={preview} src={preview} alt='' />}
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div style={{ display: 'grid', gap: 'var(--spacing-3)', minWidth: 0 }}>
          <label htmlFor='avatar-file'><Text size={2} fontWeight={500}>Profile photo</Text></label>
          <input ref={inputRef} id='avatar-file' name='avatar' type='file' accept='image/png, image/jpeg, image/webp' onChange={choose} style={{ maxWidth: '100%', fontFamily: 'inherit', fontSize: 'var(--font-size-2)', color: 'var(--label-secondary)' }} />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-4)' }}>
        <Button type='submit' size='sm'>Save photo</Button>
        <Button type='reset' size='sm' variant='secondary' appearance='ghost' disabled={preview === ''}>Remove</Button>
        <Text size={2} role='status' style={{ color: 'var(--label-secondary)', overflowWrap: 'anywhere' }}>{result}</Text>
      </div>
    </form>
  );
}
```
<!-- /example -->

## Раскладка/оверлей

### Раскладка/оверлей: ветка комментариев с длинным текстом

Аватар выровнен по верху многострочного комментария. В flex-строке длинный текст может его сжать, поэтому у аватара `flex-shrink: 0`, а у колонки текста — `min-width: 0` и `overflow-wrap: anywhere` для длинной ссылки.

<!-- example: avatar/comment-thread.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const comments = [
  {
    id: 1,
    author: 'Maria Chen',
    initials: 'MC',
    photo: portrait(210),
    time: '10:24',
    text: 'The retry policy should back off exponentially, otherwise a failing endpoint gets hammered every few seconds and we fill the queue with duplicate deliveries for the same event.',
  },
  {
    id: 2,
    author: 'Omar Haddad',
    initials: 'OH',
    photo: '',
    time: '10:31',
    text: 'Agreed. See https://example.com/rfcs/webhook-delivery-retry-policy-with-exponential-backoff-and-jitter',
  },
];

export default function CommentThread() {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-10)', width: '100%', maxWidth: 420 }}>
      {comments.map((comment) => (
        <li key={comment.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-6)' }}>
          <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0 }}>
            {comment.photo && <AvatarImage src={comment.photo} alt='' />}
            <AvatarFallback>{comment.initials}</AvatarFallback>
          </Avatar>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)', minWidth: 0 }}>
            <Text size={2} style={{ color: 'var(--label-tertiary)' }}>
              <Text size={2} fontWeight={500} style={{ color: 'var(--label-primary)' }}>{comment.author}</Text>
              {' · '}
              <time style={{ fontVariantNumeric: 'tabular-nums' }}>{comment.time}</time>
            </Text>
            <Text size={2} style={{ overflowWrap: 'anywhere' }}>{comment.text}</Text>
          </div>
        </li>
      ))}
    </ol>
  );
}
```
<!-- /example -->

## Ошибка

### Ошибка: изображение не загрузилось

`AvatarImage` скрыт, пока не загрузится. Если загрузка не удалась, видны инициалы из `AvatarFallback`, а если задан `fallbackSrc`, сначала пробуется он. Каждый аватар получает одно доступное имя через `role='img'` и `aria-label`, поэтому инициалы не читаются как второе имя.

<!-- example: avatar/image-fallbacks.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarImage, Text } from '@vega-ui/react';

const portrait = (hue: number) => `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='hsl(${hue} 60% 82%)'/><circle cx='32' cy='25' r='11' fill='hsl(${hue} 35% 42%)'/><path d='M12 64c1-13 9-21 20-21s19 8 20 21z' fill='hsl(${hue} 35% 42%)'/></svg>`)}`;

const photo = portrait(150);
const placeholder = portrait(220);
const broken = 'data:image/png;base64,broken';

const cases = [
  { label: 'Image loads', name: 'Priya Nair', initials: 'PN', src: photo, fallbackSrc: undefined },
  { label: 'Image fails → initials', name: 'Diego Alvarez', initials: 'DA', src: broken, fallbackSrc: undefined },
  { label: 'Image fails → fallbackSrc', name: 'Sara Lindqvist', initials: 'SL', src: broken, fallbackSrc: placeholder },
];

export default function ImageFallbacks() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'var(--spacing-8)', width: '100%' }}>
      {cases.map((item) => (
        <figure key={item.label} style={{ margin: 0, display: 'grid', gap: 'var(--spacing-4)', justifyItems: 'center', alignContent: 'start', textAlign: 'center' }}>
          <Avatar size='lg' role='img' aria-label={item.name}>
            <AvatarImage src={item.src} fallbackSrc={item.fallbackSrc} alt='' />
            <AvatarFallback>{item.initials}</AvatarFallback>
          </Avatar>
          <figcaption><Text size={1} style={{ color: 'var(--label-secondary)' }}>{item.label}</Text></figcaption>
        </figure>
      ))}
    </div>
  );
}
```
<!-- /example -->

## Пограничный случай

### Пограничный случай: инициалы из реальных имён

Инициалы берутся из первого и последнего слова; одно слово даёт две буквы, а пустое имя заменяется иконкой. `Array.from` сохраняет нелатинские и диакритические буквы целыми, а длинные имена обрезаются рядом с аватаром.

<!-- example: avatar/initials.tsx -->
```tsx
import { Avatar, AvatarFallback, AvatarIcon, Text } from '@vega-ui/react';
import { User } from '@vega-ui/icons';

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/).filter((word) => word !== '');
  if (words.length === 0) return '';
  if (words.length === 1) return Array.from(words[0]).slice(0, 2).join('').toLocaleUpperCase();
  const first = Array.from(words[0])[0];
  const last = Array.from(words[words.length - 1])[0];
  return `${first}${last}`.toLocaleUpperCase();
};

const names = [
  'Ada Lovelace',
  'José María de la Cruz Fernández',
  'Prince',
  'Анна Смирнова',
  '王小明',
  'Ölüm Çelik',
  '',
];

export default function Initials() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 'var(--spacing-4)', width: '100%', maxWidth: 280 }}>
      {names.map((name) => {
        const initials = getInitials(name);
        const label = name === '' ? 'Unnamed user' : name;
        return (
          <li key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
            <Avatar size='sm' aria-hidden='true' style={{ flexShrink: 0 }}>
              {initials === '' && <AvatarIcon><User /></AvatarIcon>}
              {initials !== '' && <AvatarFallback>{initials}</AvatarFallback>}
            </Avatar>
            <Text size={3} style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</Text>
          </li>
        );
      })}
    </ul>
  );
}
```
<!-- /example -->
