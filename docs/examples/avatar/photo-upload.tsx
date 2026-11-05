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
