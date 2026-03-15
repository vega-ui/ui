const steps = ['0','50','100','150','200','250','300','350','400','450','500','550','600','650','700','750','800','850','900','950','1000'];

const Swatch = ({ name, step }: { name: string; step: string }) => (
    // @ts-expect-error: ignore sb
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
        <div style={{ width: '100%', aspectRatio: '1', borderRadius: 6, backgroundColor: `var(--color-${name}-${step})` }} />
        <span style={{ fontSize: 10, fontWeight: 500, color: '#6b7280' }}>{step}</span>
    </div>
);

export const ColorPaletteItem = ({ name }: { name: string }) => (
    <div style={{ marginBottom: 32, fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 12 }}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
            {steps.map(step => <Swatch key={step} name={name} step={step} />)}
        </div>
    </div>
);
