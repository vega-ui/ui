'use client';

import { Button, Icon } from '@vega-ui/react';
import { BookOpen, Code, PenTool } from '@vega-ui/icons';
import type { ComponentEntry } from '@/lib/content';
import { useDictionary } from './LocaleProvider';
import styles from './ResourceLinks.module.css';

export const ResourceLinks = ({ component }: { component: ComponentEntry }) => {
  const t = useDictionary();
  const links = [
    component.storybook && { href: `${process.env.NEXT_PUBLIC_BASE_PATH}/storybook/?path=/docs/${component.storybook}`, label: t.links.storybook, icon: <BookOpen /> },
    component.source && { href: component.source, label: t.links.source, icon: <Code /> },
    component.figma && { href: component.figma, label: t.links.figma, icon: <PenTool /> },
  ].filter((link) => !!link);

  if (links.length === 0) return null;

  return (
    <div className={styles.links}>
      {links.map((link) => (
        <Button key={link.label} asChild size='xs' variant='secondary' appearance='ghost' className={styles.pill}>
          <a href={link.href}>
            <Icon size='xs'>{link.icon}</Icon>
            {link.label}
          </a>
        </Button>
      ))}
    </div>
  );
};
