import {
  Label,
  Select,
  SelectCombobox,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectValue,
  Spinner,
  Text,
} from '@vega-ui/react';
import { useId, useState } from 'react';

interface Project {
  id: string;
  name: string;
}

const fetchProjects = () => new Promise<Project[]>((resolve) => {
  setTimeout(() => resolve([
    { id: 'apollo', name: 'Apollo website' },
    { id: 'borealis', name: 'Borealis mobile app' },
    { id: 'cobalt', name: 'Cobalt billing API' },
    { id: 'delta', name: 'Delta data warehouse' },
  ]), 1200);
});

export default function AsyncOptions() {
  const id = useId();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project | null>({ id: 'apollo', name: 'Apollo website' });

  const onChangeOpen = (open: boolean) => {
    if (!open || projects !== null || loading) return;

    setLoading(true);
    fetchProjects().then((result) => {
      setProjects(result);
      setLoading(false);
    });
  };

  const onChangeValue = (next: string | undefined) => {
    const found = projects?.find((item) => item.id === next);
    setProject(found ?? null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', width: '100%', maxWidth: 280 }}>
      <Label htmlFor={id}>Move the task to</Label>
      <Select value={project?.id ?? null} onChangeValue={onChangeValue} onChangeOpen={onChangeOpen}>
        <SelectCombobox id={id}>
          <SelectValue placeholder='Choose a project'>{project?.name}</SelectValue>
          <SelectIcon />
        </SelectCombobox>
        <SelectListbox aria-busy={loading}>
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)' }}>
              <Spinner size={2} aria-label='Loading projects' />
              <Text size={2}>Loading projects…</Text>
            </div>
          )}
          {projects?.map((item) => (
            <SelectOption key={item.id} value={item.id}>
              {item.name}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </div>
  );
}
