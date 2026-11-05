import { useId, useState, type CSSProperties } from 'react';
import {
  Badge,
  Card,
  DataGrid,
  DataGridCell,
  DataGridRow,
  DataGridRowGroup,
  Heading,
  Icon,
  MeterStack,
  MeterStackSegment,
  Progress,
  ProgressTrack,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
  SegmentedControlItemInput,
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeading,
  TableRow,
  Text,
} from '@vega-ui/react';
import { ArrowDown, ArrowUp } from '@vega-ui/icons';
import './analytics.css';

type Period = '7' | '30' | '90';

const periods: { value: Period, label: string }[] = [
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
];

const stats: Record<Period, { visitors: [number, number], views: [number, number], signups: [number, number], session: [number, number], goal: number }> = {
  7: { visitors: [12_480, 11_020], views: [38_920, 36_410], signups: [412, 436], session: [194, 181], goal: 500 },
  30: { visitors: [51_760, 47_300], views: [162_340, 151_900], signups: [1_684, 1_520], session: [188, 192], goal: 2_000 },
  90: { visitors: [148_200, 121_450], views: [471_800, 402_600], signups: [4_912, 3_870], session: [185, 176], goal: 6_000 },
};

const sources = [
  { id: 'search', label: 'Search', share: [0.42, 0.39, 0.37], color: 'var(--color-blue-500)' },
  { id: 'direct', label: 'Direct', share: [0.24, 0.26, 0.27], color: 'var(--color-purple-500)' },
  { id: 'social', label: 'Social', share: [0.16, 0.15, 0.17], color: 'var(--color-green-500)' },
  { id: 'referral', label: 'Referral', share: [0.11, 0.12, 0.11], color: 'var(--color-orange-500)' },
  { id: 'email', label: 'Email', share: [0.07, 0.08, 0.08], color: 'var(--color-gray-500)' },
];

const pages = [
  { path: '/pricing', share: 0.18, time: 142 },
  { path: '/', share: 0.16, time: 64 },
  { path: '/docs/getting-started', share: 0.11, time: 296 },
  { path: '/blog/shipping-faster-with-previews', share: 0.07, time: 341 },
  { path: '/templates', share: 0.06, time: 118 },
  { path: '/changelog', share: 0.04, time: 87 },
];

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const hours = Array.from({ length: 12 }, (_, index) => index * 2);
const dayLoad = [1, 1.08, 1.05, 0.98, 0.86, 0.42, 0.36];
const hourLoad = [0.08, 0.04, 0.06, 0.3, 0.82, 1, 0.92, 0.88, 0.7, 0.48, 0.34, 0.18];
const levels = [8, 24, 44, 68, 92];

const number = new Intl.NumberFormat('en-US');
const percent = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 });
const signedPercent = new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1, signDisplay: 'exceptZero' });

const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, '0')}s`;

const formatHour = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

const getLevel = (value: number, max: number) => Math.min(levels.length - 1, Math.floor((value / max) * levels.length));

const tabular = { fontVariantNumeric: 'tabular-nums' } as const;
const nowrap = { whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' } as const;
const card = { alignItems: 'stretch', gap: 'var(--spacing-10)', minWidth: 0 } as const;

export default function Analytics() {
  const id = useId();
  const [period, setPeriod] = useState<Period>('30');

  const data = stats[period];
  const index = periods.findIndex((item) => item.value === period);
  const label = periods[index].label;

  const kpis = [
    { id: 'visitors', title: 'Visitors', value: number.format(data.visitors[0]), current: data.visitors[0], previous: data.visitors[1] },
    { id: 'views', title: 'Page views', value: number.format(data.views[0]), current: data.views[0], previous: data.views[1] },
    { id: 'signups', title: 'Sign-ups', value: number.format(data.signups[0]), current: data.signups[0], previous: data.signups[1] },
    { id: 'session', title: 'Avg. session', value: formatDuration(data.session[0]), current: data.session[0], previous: data.session[1] },
  ];

  const traffic = sources.map((source) => ({ ...source, visitors: Math.round(data.visitors[0] * source.share[index]) }));
  const trafficTotal = traffic.reduce((sum, source) => sum + source.visitors, 0);
  const conversion = data.signups[0] / data.visitors[0];
  const goalShare = Math.min(1, data.signups[0] / data.goal);

  const activity = weekdays.map((_, day) => hours.map((_, slot) => Math.round((data.visitors[0] / 84) * dayLoad[day] * hourLoad[slot] * 1.6)));
  const peak = Math.max(...activity.flat());

  return (
    <div style={{ display: 'grid', gap: 'var(--spacing-12)', width: '100%', maxWidth: 960, marginInline: 'auto' }}>
      <header style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--spacing-8) var(--spacing-12)' }}>
        <div style={{ display: 'grid', gap: 'var(--spacing-2)', flex: '1 1 320px' }}>
          <Heading as='h1' size={7} fontWeight={700}>Analytics</Heading>
          <Text size={3} style={{ color: 'var(--label-secondary)' }}>Traffic and sign-ups for northwind.io.</Text>
        </div>
        <SegmentedControl
          name={`${id}-period`}
          role='radiogroup'
          aria-label='Period'
          value={period}
          onChange={(event) => setPeriod(event.target.value as Period)}
        >
          {periods.map((item) => (
            <SegmentedControlItem key={item.value} value={item.value}>
              <SegmentedControlItemInput />
              {item.label}
            </SegmentedControlItem>
          ))}
          <SegmentedControlIndicator />
        </SegmentedControl>
      </header>

      <ul aria-label={`Key metrics, last ${label}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 'var(--spacing-8)', margin: 0, padding: 0, listStyle: 'none' }}>
        {kpis.map((kpi) => {
          const delta = (kpi.current - kpi.previous) / kpi.previous;
          const up = delta >= 0;

          return (
            <Card key={kpi.id} asChild style={{ ...card, gap: 'var(--spacing-3)' }}>
              <li>
                <Text size={2} fontWeight={500} style={{ color: 'var(--label-secondary)' }}>{kpi.title}</Text>
                <Text size={7} fontWeight={700} style={nowrap}>{kpi.value}</Text>
                <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--spacing-2) var(--spacing-4)' }}>
                  <Badge size='sm' variant={up ? 'success' : 'error'} style={{ gap: 'var(--spacing-1)', ...tabular }}>
                    <Icon size='xs' aria-hidden='true'>{up ? <ArrowUp strokeWidth={2.5} /> : <ArrowDown strokeWidth={2.5} />}</Icon>
                    {signedPercent.format(delta)}
                  </Badge>
                  <Text size={2} style={{ color: 'var(--label-secondary)' }}>{`vs previous ${label}`}</Text>
                </span>
              </li>
            </Card>
          );
        })}
      </ul>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 'var(--spacing-8)' }}>
        <Card style={{ ...card, flex: '999 1 420px' }} aria-labelledby={`${id}-sources`}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' }}>
            <Heading id={`${id}-sources`} as='h2' size={4} fontWeight={600}>Traffic sources</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)', ...tabular }}>{`${number.format(trafficTotal)} visitors`}</Text>
          </div>
          <MeterStack value={trafficTotal} max={trafficTotal} role='group' aria-labelledby={`${id}-sources`} size='lg' fullWidth>
            {traffic.map((source) => (
              <MeterStackSegment
                key={source.id}
                value={source.visitors}
                aria-label={source.label}
                aria-valuetext={`${number.format(source.visitors)} visitors, ${percent.format(source.visitors / trafficTotal)}`}
                style={{ '--meter-stack-segment-color': source.color } as CSSProperties}
              />
            ))}
          </MeterStack>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 160px), 1fr))', gap: 'var(--spacing-5) var(--spacing-12)', margin: 0, padding: 0, listStyle: 'none' }}>
            {traffic.map((source) => (
              <li key={source.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
                <span aria-hidden='true' style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: source.color }} />
                <Text size={2}>{source.label}</Text>
                <Text size={2} style={{ marginInlineStart: 'auto', color: 'var(--label-secondary)', ...tabular }}>{percent.format(source.visitors / trafficTotal)}</Text>
              </li>
            ))}
          </ul>
        </Card>

        <Card style={{ ...card, flex: '1 1 260px', justifyContent: 'space-between' }} aria-labelledby={`${id}-conversion`}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Heading id={`${id}-conversion`} as='h2' size={4} fontWeight={600}>Conversion</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>Visitors who started a trial.</Text>
          </div>
          <Text size={7} fontWeight={700} style={nowrap}>{percent.format(conversion)}</Text>
          <div style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-2) var(--spacing-8)' }}>
              <Text id={`${id}-goal`} size={2} fontWeight={500}>Trial goal</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)', ...tabular }}>{`${number.format(data.signups[0])} of ${number.format(data.goal)}`}</Text>
            </div>
            <Progress
              value={Math.round(goalShare * 100)}
              valueText={`${number.format(data.signups[0])} of ${number.format(data.goal)} trials`}
              aria-labelledby={`${id}-goal`}
              size='sm'
              fullWidth
            >
              <ProgressTrack />
            </Progress>
          </div>
        </Card>
      </div>

      <Card style={card} aria-labelledby={`${id}-activity`}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--spacing-4) var(--spacing-8)' }}>
          <div style={{ display: 'grid', gap: 'var(--spacing-1)' }}>
            <Heading id={`${id}-activity`} as='h2' size={4} fontWeight={600}>Activity by weekday and hour</Heading>
            <Text size={2} style={{ color: 'var(--label-secondary)' }}>Average visitors per two-hour window, in UTC.</Text>
          </div>
          <span aria-hidden='true' style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
            <Text size={1} style={{ color: 'var(--label-secondary)', marginInlineEnd: 'var(--spacing-2)' }}>Less</Text>
            {levels.map((level) => <span key={level} className='analyticsSwatch' style={{ '--level': `${level}%` } as CSSProperties} />)}
            <Text size={1} style={{ color: 'var(--label-secondary)', marginInlineStart: 'var(--spacing-2)' }}>More</Text>
          </span>
        </div>
        <DataGrid aria-labelledby={`${id}-activity`} defaultActive='1:1' className='analyticsHeatmap'>
          <DataGridRowGroup>
            <DataGridRow row={0}>
              <DataGridCell col={0} role='columnheader' excluded aria-label='Weekday' />
              {hours.map((hour, slot) => (
                <DataGridCell key={hour} col={slot + 1} role='columnheader' excluded aria-label={formatHour(hour)}>
                  {slot % 2 === 0 ? String(hour).padStart(2, '0') : ''}
                </DataGridCell>
              ))}
            </DataGridRow>
          </DataGridRowGroup>
          <DataGridRowGroup>
            {activity.map((row, day) => (
              <DataGridRow key={weekdays[day]} row={day + 1}>
                <DataGridCell col={0} role='rowheader' excluded aria-label={weekdayNames[day]}>{weekdays[day]}</DataGridCell>
                {row.map((value, slot) => (
                  <DataGridCell
                    key={hours[slot]}
                    col={slot + 1}
                    aria-label={`${weekdayNames[day]}, ${formatHour(hours[slot])} to ${formatHour(hours[slot] + 2)}: ${number.format(value)} visitors`}
                    title={`${weekdays[day]} ${formatHour(hours[slot])}–${formatHour(hours[slot] + 2)} · ${number.format(value)}`}
                    style={{ '--level': `${levels[getLevel(value, peak)]}%` } as CSSProperties}
                  />
                ))}
              </DataGridRow>
            ))}
          </DataGridRowGroup>
        </DataGrid>
      </Card>

      <section aria-labelledby={`${id}-pages`} style={{ display: 'grid', gap: 'var(--spacing-8)' }}>
        <Heading id={`${id}-pages`} as='h2' size={4} fontWeight={600}>Top pages</Heading>
        <div
          role='region'
          aria-labelledby={`${id}-pages`}
          tabIndex={0}
          style={{ minWidth: 0, overflowX: 'auto', border: '1px solid var(--separator-opaque)', borderRadius: 'var(--radius-4)', background: 'var(--surface-primary)' }}
        >
          <Table fullWidth edgePadded style={{ borderStyle: 'hidden' }}>
            <TableHead>
              <TableRow>
                <TableHeading scope='col' dataAlign='start'>Page</TableHeading>
                <TableHeading scope='col' dataAlign='end'>Views</TableHeading>
                <TableHeading scope='col' dataAlign='end'>Share</TableHeading>
                <TableHeading scope='col' dataAlign='end'>Avg. time</TableHeading>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.path}>
                  <TableData dataAlign='start' style={{ overflowWrap: 'anywhere' }}>{page.path}</TableData>
                  <TableData dataAlign='end' style={nowrap}>{number.format(Math.round(data.views[0] * page.share))}</TableData>
                  <TableData dataAlign='end' style={{ ...nowrap, color: 'var(--label-secondary)' }}>{percent.format(page.share)}</TableData>
                  <TableData dataAlign='end' style={nowrap}>{formatDuration(page.time)}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
