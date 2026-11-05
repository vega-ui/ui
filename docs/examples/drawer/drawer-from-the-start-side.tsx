import { useId, useState, type CSSProperties } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
  Heading,
  Icon,
  IconButton,
} from '@vega-ui/react';
import { XIcon } from '@vega-ui/icons';

const sections = {
  ltr: { title: 'Navigation', links: ['Inbox', 'Projects', 'Reports', 'Settings'], toggle: 'Switch to right-to-left' },
  rtl: { title: 'التنقل', links: ['البريد الوارد', 'المشاريع', 'التقارير', 'الإعدادات'], toggle: 'Switch to left-to-right' },
};

export default function DrawerFromTheStartSide() {
  const titleId = useId();
  const [dir, setDir] = useState<'ltr' | 'rtl'>('ltr');
  const [current, setCurrent] = useState(1);

  const section = sections[dir];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-4)', width: '100%' }}>
      <Drawer position='start'>
        <DrawerTrigger asChild>
          <Button>Open navigation</Button>
        </DrawerTrigger>
        <DrawerContent dir={dir} fullHeight aria-labelledby={titleId} style={{ width: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--spacing-8)' }}>
            <Heading id={titleId} as='h2' size={4} fontWeight={600}>{section.title}</Heading>
            <DrawerClose asChild>
              <IconButton
                aria-label='Close'
                variant='secondary'
                appearance='ghost'
                style={{ flexShrink: 0, '--icon-button-size': '24px', '--icon-button-br-ratio': 0.5 } as CSSProperties}
              >
                <Icon size='xs'><XIcon strokeWidth={2.5} /></Icon>
              </IconButton>
            </DrawerClose>
          </div>
          <nav aria-labelledby={titleId} style={{ display: 'grid', gap: 'var(--spacing-1)', marginBlockStart: 'var(--spacing-8)' }}>
            {section.links.map((link, index) => (
              <DrawerClose asChild key={link}>
                <Button
                  variant='secondary'
                  appearance={index === current ? 'ghost' : 'transparent'}
                  aria-current={index === current ? 'page' : undefined}
                  style={{ justifyContent: 'flex-start' }}
                  onClick={() => setCurrent(index)}
                >
                  {link}
                </Button>
              </DrawerClose>
            ))}
          </nav>
        </DrawerContent>
      </Drawer>
      <Button variant='secondary' appearance='ghost' onClick={() => setDir(dir === 'ltr' ? 'rtl' : 'ltr')}>{section.toggle}</Button>
    </div>
  );
}
