import { Heading } from '@vega-ui/react';
import section from './HomeSection.module.css';

export const HomeTitle = ({ id, text }: { id: string, text: string }) => (
  <Heading id={id} as='h2' fontWeight={600} className={section.title}>
    {text.split(/\[(.+?)\]/).map((part, index) => {
      if (index % 2 === 0) return part;

      return <span key={index} className={section.ring}>{part}</span>;
    })}
  </Heading>
);
