'use client';

import { useState } from 'react';
import { useDictionary } from './LocaleProvider';
import { TemplateCards, type TemplateCardEntry } from './TemplateCards';
import styles from './TemplateCards.module.css';

export interface TemplateFilterEntry extends TemplateCardEntry {
  category?: string
}

export const TemplateCardsFilter = ({ templates, categories }: { templates: TemplateFilterEntry[], categories: string[] }) => {
  const t = useDictionary().templates;
  const [category, setCategory] = useState('all');
  const available = categories.filter((item) => templates.some((template) => template.category === item));
  const options = [{ value: 'all', count: templates.length }, ...available.map((item) => ({ value: item, count: templates.filter((template) => template.category === item).length }))];
  const visible = category === 'all' ? templates : templates.filter((template) => template.category === category);

  return (
    <div className={styles.catalog}>
      <div role='radiogroup' aria-label={t.filter} className={styles.filters}>
        {options.map((option) => (
          <label key={option.value} className={styles.filter}>
            <input
              type='radio'
              name='template-category'
              value={option.value}
              checked={category === option.value}
              className={styles.filterInput}
              onChange={() => setCategory(option.value)}
            />
            {t.categories[option.value]}
            <span className={styles.filterCount}>{option.count}</span>
          </label>
        ))}
      </div>
      <TemplateCards templates={visible} />
    </div>
  );
};
