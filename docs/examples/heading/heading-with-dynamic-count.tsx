import { Button, Heading, Text } from '@vega-ui/react';
import { useState } from 'react';

const candidates = ['Alicia Gómez', 'Ben Carter', 'Chen Wei', 'Dana Novak', 'Emeka Obi'];

export default function HeadingWithDynamicCount() {
  const [members, setMembers] = useState(candidates.slice(0, 2));
  const nextCandidate = candidates.find((name) => !members.includes(name));

  const addMember = () => {
    if (nextCandidate === undefined) return;
    setMembers([...members, nextCandidate]);
  };

  return (
    <section aria-labelledby='members-title' style={{ display: 'grid', gap: 'var(--spacing-4)', width: '100%' }}>
      <Heading as='h3' size={5} id='members-title' style={{ fontVariantNumeric: 'tabular-nums', marginBlockEnd: 'var(--spacing-2)' }}>
        Members ({members.length})
      </Heading>
      {members.map((name) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
          <Text size={3}>{name}</Text>
          <Button
            size='sm'
            variant='secondary'
            appearance='ghost'
            aria-label={`Remove ${name}`}
            onClick={() => setMembers(members.filter((member) => member !== name))}
          >
            Remove
          </Button>
        </div>
      ))}
      {members.length === 0 && <Text size={2} style={{ color: 'var(--label-secondary)' }}>No members yet.</Text>}
      <Button
        size='sm'
        variant='secondary'
        appearance='ghost'
        disabled={nextCandidate === undefined}
        onClick={addMember}
        style={{ justifySelf: 'start', marginBlockStart: 'var(--spacing-4)' }}
      >
        Add member
      </Button>
    </section>
  );
}
