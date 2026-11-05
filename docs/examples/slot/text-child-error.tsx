import { Component, type ReactNode, useState } from 'react';
import { Button, ButtonBase, HelperText } from '@vega-ui/react';

interface BoundaryProps {
  children: ReactNode
}

interface BoundaryState {
  message: string
}

class SlotErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { message: '' };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { message: error.message };
  }

  render() {
    if (this.state.message !== '') {
      return <HelperText error role='alert'>{this.state.message}</HelperText>;
    }

    return this.props.children;
  }
}

export default function TextChildError() {
  const [broken, setBroken] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const toggle = () => {
    setBroken(!broken);
    setAttempt(attempt + 1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-8)', width: '100%' }}>
      <SlotErrorBoundary key={attempt}>
        {broken && <ButtonBase asChild>Open billing</ButtonBase>}
        {!broken && (
          <ButtonBase asChild variant='secondary' appearance='ghost'>
            <a href='/billing' style={{ padding: 'var(--spacing-3) var(--spacing-8)', borderRadius: 'var(--radius-3)', fontSize: 'var(--font-size-2)' }}>
              Open billing
            </a>
          </ButtonBase>
        )}
      </SlotErrorBoundary>
      <Button type='button' size='sm' variant='secondary' appearance='ghost' onClick={toggle}>
        {broken ? 'Pass an element child' : 'Pass plain text instead'}
      </Button>
    </div>
  );
}
