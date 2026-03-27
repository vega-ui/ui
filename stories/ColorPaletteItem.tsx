// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const STEPS = ['0','100','200','300','400','500','600','700','800','900','1000'];

const Swatch = ({ name, step, variant }: { name: string; step: string; variant?: string }) => {
    const varName = variant ? `--color-${name}-${variant}-${step}` : `--color-${name}-${step}`;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
            <div style={{ width: '100%', aspectRatio: '1', borderRadius: 4, backgroundColor: `var(${varName})` }} />
            <span style={{ fontSize: 9, fontWeight: 500, color: '#6b7280' }}>{step}</span>
        </div>
    );
};

const SwatchRow = ({ name, variant, label }: { name: string; variant?: string; label: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, maxWidth: 400 }}>
        <span style={{ fontSize: 10, fontWeight: 500, color: '#6b7280' }}>{label}</span>
        <div style={{ display: 'flex', gap: 3 }}>
            {STEPS.map(step => (
                <Swatch key={step} name={name} step={step} variant={variant} />
            ))}
        </div>
    </div>
);

export const ColorPaletteItem = ({ name }: { name: string }) => (
    <div style={{ marginBottom: 20, fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#111827', marginBottom: 8 }}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <SwatchRow name={name} label='Base' />
        </div>
    </div>
);
