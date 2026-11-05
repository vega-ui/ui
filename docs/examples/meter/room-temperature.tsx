import { Meter, MeterTrack, Text } from '@vega-ui/react';
import { useId } from 'react';

const rooms = [
  { id: 'living', name: 'Living room', celsius: 21.5 },
  { id: 'bedroom', name: 'Bedroom', celsius: 18.2 },
  { id: 'server', name: 'Server closet', celsius: 29.8 },
];

export default function RoomTemperature() {
  const prefix = useId();

  return (
    <ul style={{ display: 'grid', gap: 'var(--spacing-8)', width: '100%', maxWidth: 360, margin: 0, padding: 0, listStyle: 'none' }}>
      {rooms.map((room) => {
        const labelId = `${prefix}-${room.id}`;
        let verdict = 'Comfortable';
        if (room.celsius < 19) {
          verdict = 'Too cold';
        } else if (room.celsius > 24) {
          verdict = 'Too warm';
        }

        return (
          <li key={room.id} style={{ display: 'grid', gap: 'var(--spacing-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--spacing-8)' }}>
              <Text id={labelId} size={2}>{room.name}</Text>
              <Text size={2} style={{ color: 'var(--label-secondary)', fontVariantNumeric: 'tabular-nums' }}>{room.celsius} °C · {verdict}</Text>
            </div>
            <Meter
              value={room.celsius}
              min={10}
              max={35}
              low={19}
              high={24}
              optimum={21.5}
              valueText={`${room.celsius} °C, ${verdict.toLowerCase()}`}
              aria-labelledby={labelId}
              fullWidth
            >
              <MeterTrack />
            </Meter>
          </li>
        );
      })}
    </ul>
  );
}
