import { Button, Heading, Label, Text, TextField, TextFieldInput } from '@vega-ui/react';
import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react';

interface FieldError {
  id: string
  message: string
}

export default function ErrorSummaryHeading() {
  const summaryHeading = useRef<HTMLHeadingElement>(null);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [attempt, setAttempt] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (attempt === 0) return;
    summaryHeading.current?.focus();
  }, [attempt]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: FieldError[] = [];

    if (String(data.get('name')).trim() === '') {
      nextErrors.push({ id: 'contact-name', message: 'Enter your name' });
    }

    if (!String(data.get('email')).includes('@')) {
      nextErrors.push({ id: 'contact-email', message: 'Enter an email address like name@example.com' });
    }

    setErrors(nextErrors);
    setSent(nextErrors.length === 0);

    if (nextErrors.length > 0) setAttempt(attempt + 1);
  };

  const hasError = (id: string) => errors.some((error) => error.id === id);

  return (
    <form noValidate onSubmit={onSubmit} style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%' }}>
      {errors.length > 0 && (
        <div
          style={{
            display: 'grid',
            gap: 'var(--spacing-3)',
            padding: 'var(--spacing-8)',
            borderRadius: 'var(--radius-3)',
            border: '1px solid var(--color-error)',
          }}
        >
          <Heading as='h2' size={4} ref={summaryHeading} tabIndex={-1}>
            There {errors.length === 1 ? 'is 1 problem' : `are ${errors.length} problems`} with your request
          </Heading>
          {errors.map((error) => (
            <Text key={error.id} asChild size={2} style={{ '--t-color': 'var(--color-error)' } as CSSProperties}>
              <a href={`#${error.id}`}>{error.message}</a>
            </Text>
          ))}
        </div>
      )}
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='contact-name'>Name</Label>
        <TextField error={hasError('contact-name')}>
          <TextFieldInput id='contact-name' name='name' autoComplete='name' aria-invalid={hasError('contact-name')} />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
        <Label htmlFor='contact-email'>Email</Label>
        <TextField error={hasError('contact-email')}>
          <TextFieldInput
            id='contact-email'
            name='email'
            type='email'
            autoComplete='email'
            aria-invalid={hasError('contact-email')}
          />
        </TextField>
      </div>
      <div style={{ display: 'grid', gap: 'var(--spacing-6)', marginBlockStart: 'var(--spacing-4)' }}>
        <Button type='submit' style={{ justifySelf: 'end' }}>Request demo</Button>
        {sent && <Text size={2} role='status' style={{ color: 'var(--label-secondary)' }}>Thanks, we will reply within one business day.</Text>}
      </div>
    </form>
  );
}
