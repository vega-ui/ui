'use client';

import { useMemo } from 'react';
import { Code, Table, TableBody, TableData, TableHead, TableHeading, TableRow } from '@vega-ui/react';
import type { PropRow } from '@/lib/content';
import { useDictionary } from './LocaleProvider';
import styles from './PropsTable.module.css';

const renderInline = (text: string) => text.split('`').map((part, index) => index % 2 === 1 ? <Code key={index} size={2}>{part}</Code> : part);

export const PropsTable = ({ rows: json }: { rows: string }) => {
  const rows = useMemo<PropRow[]>(() => JSON.parse(json), [json]);
  const t = useDictionary().props;

  return (
    <div className={styles.wrapper}>
      <Table dataAlign='start' edgePadded className={styles.table}>
        <TableHead>
          <TableRow>
            <TableHeading>{t.prop}</TableHeading>
            <TableHeading>{t.type}</TableHeading>
            <TableHeading>{t.default}</TableHeading>
          </TableRow>
        </TableHead>
        {rows.map((row) => (
          <TableBody key={row.name}>
            <TableRow className={styles.main}>
              <TableData className={styles.name}>
                {renderInline(row.name)}
                {row.required && <span className={styles.required}>{t.required}</span>}
              </TableData>
              <TableData className={styles.type} data-label={t.type}>{renderInline(row.type)}</TableData>
              <TableData className={styles.value} data-label={t.default} data-empty={row.value === '—'}>{renderInline(row.value)}</TableData>
            </TableRow>
            <TableRow>
              <TableData colSpan={3} className={styles.description}>{renderInline(row.description)}</TableData>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};
