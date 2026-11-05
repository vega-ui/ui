import { Check, Minus } from '@vega-ui/icons';
import {
  Icon,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  VisuallyHidden,
} from '@vega-ui/react';

const plans = ['Starter', 'Team', 'Enterprise'];

const features: { name: string, values: (string | boolean)[] }[] = [
  { name: 'Price per seat', values: ['$9', '$29', 'Custom'] },
  { name: 'Projects', values: ['5', 'Unlimited', 'Unlimited'] },
  { name: 'Storage', values: ['10 GB', '1 TB', '5 TB'] },
  { name: 'Single sign-on', values: [false, true, true] },
  { name: 'Audit log', values: [false, false, true] },
];

export const layout = 'wide';

export default function PlanComparisonTable() {
  return (
    <div role='region' aria-label='Compare plans' tabIndex={0} style={{ width: '100%', overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}>
      <Table fullWidth edgePadded dataAlign='center' style={{ borderStyle: 'hidden' }}>
        <caption style={{ captionSide: 'top', textAlign: 'start', padding: 'var(--spacing-6)', paddingBlockEnd: 0, fontWeight: 600 }}>
          Compare plans
        </caption>
        <TableHead>
          <TableRow>
            <TableHeading scope='col' dataAlign='start'>Feature</TableHeading>
            {plans.map((plan) => <TableHeading key={plan} scope='col'>{plan}</TableHeading>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableHeading scope='row' dataAlign='start' style={{ fontWeight: 400, whiteSpace: 'nowrap' }}>{feature.name}</TableHeading>
              {feature.values.map((value, index) => {
                if (typeof value === 'string') {
                  return <TableData key={plans[index]}>{value}</TableData>;
                }

                return (
                  <TableData key={plans[index]}>
                    <Icon size='sm' aria-hidden='true'>{value ? <Check /> : <Minus />}</Icon>
                    <VisuallyHidden>{value ? 'Included' : 'Not included'}</VisuallyHidden>
                  </TableData>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
