// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const surfaces = [
    { token: '--surface-ultrathick', label: 'ultrathick' },
    { token: '--surface-thick',     label: 'thick' },
    { token: '--surface-regular',   label: 'regular' },
    { token: '--surface-thin',      label: 'thin' },
    { token: '--surface-ultrathin', label: 'ultrathin' },
];

const fillGroups = [
    {
        label: 'Primary',
        tokens: ['--fills-primary', '--fills-primary-hover', '--fills-primary-active'],
        sublabels: ['default', 'hover', 'active'],
    },
    {
        label: 'Secondary',
        tokens: ['--fills-secondary', '--fills-secondary-hover', '--fills-secondary-active'],
        sublabels: ['default', 'hover', 'active'],
    },
    {
        label: 'Tertiary',
        tokens: ['--fills-tertiary', '--fills-tertiary-hover', '--fills-tertiary-active'],
        sublabels: ['default', 'hover', 'active'],
    },
    {
        label: 'Quaternary',
        tokens: ['--fills-quaternary', '--fills-quaternary-hover', '--fills-quaternary-active'],
        sublabels: ['default', 'hover', 'active'],
    },
];

const labelTokens = [
    { name: '--label-primary',    label: 'primary' },
    { name: '--label-secondary',  label: 'secondary' },
    { name: '--label-tertiary',   label: 'tertiary' },
    { name: '--label-quaternary', label: 'quaternary' },
];

const Token = ({ name, label }: { name: string; label?: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 80 }}>
        <div style={{
            height: 48,
            borderRadius: 8,
            backgroundColor: `var(${name})`,
        }} />
        <span style={{ fontSize: 11, color: 'var(--label-tertiary)', fontFamily: 'monospace', lineHeight: 1.3 }}>
            {label ?? name}
        </span>
    </div>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 48 }}>
        <div style={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--label-tertiary)',
            fontFamily: 'sans-serif',
            marginBottom: 16,
        }}>
            {title}
        </div>
        {children}
    </div>
);

const Row = ({ children }: { children: React.ReactNode }) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {children}
    </div>
);

const GroupLabel = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--label-secondary)',
        fontFamily: 'sans-serif',
        marginBottom: 8,
    }}>
        {children}
    </div>
);

const SurfaceStack = () => (
    <div style={{
        position: 'relative',
        backgroundColor: 'var(--background-color)',
        border: '1px solid var(--border-color)',
        borderRadius: 16,
        padding: 24,
        fontFamily: 'sans-serif',
    }}>
        <div style={{ fontSize: 11, color: 'var(--label-quaternary)', fontFamily: 'monospace', marginBottom: 16 }}>
            --background-color (page)
        </div>
        {surfaces.reduce((inner, { token, label }) => (
            <div style={{
                backgroundColor: `var(${token})`,
                borderRadius: 12,
                padding: 16,
            }}>
                <div style={{
                    fontSize: 11,
                    color: 'var(--label-tertiary)',
                    fontFamily: 'monospace',
                    marginBottom: inner ? 12 : 0,
                }}>
                    {token} ({label})
                </div>
                {inner}
            </div>
        ), null as React.ReactNode)}
    </div>
);

const SurfaceSwatches = () => (
    <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{
                height: 48,
                borderRadius: 8,
                backgroundColor: 'var(--background-color)',
            }} />
            <span style={{ fontSize: 11, color: 'var(--label-tertiary)', fontFamily: 'monospace' }}>background</span>
        </div>
        {surfaces.map(({ token, label }) => (
            <Token key={token} name={token} label={label} />
        ))}
    </div>
);

const FillsRow = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {fillGroups.map(({ label, tokens, sublabels }) => (
            <div key={label} style={{ flex: '1 1 200px' }}>
                <GroupLabel>{label}</GroupLabel>
                <Row>
                    {tokens.map((token, i) => (
                        <Token key={token} name={token} label={sublabels[i]} />
                    ))}
                </Row>
            </div>
        ))}
    </div>
);

const LabelsRow = () => (
    <div style={{ display: 'flex', gap: 12 }}>
        {labelTokens.map(({ name, label }) => (
            <div key={name} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{
                    height: 48,
                    borderRadius: 8,
                    backgroundColor: 'var(--fills-quaternary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <span style={{ color: `var(${name})`, fontFamily: 'sans-serif', fontSize: 14, fontWeight: 500 }}>
                        Aa
                    </span>
                </div>
                <span style={{ fontSize: 11, color: 'var(--label-tertiary)', fontFamily: 'monospace' }}>
                    {label}
                </span>
            </div>
        ))}
    </div>
);

export const SurfacesPage = () => (
    <div style={{
        backgroundColor: 'var(--background-color)',
        minHeight: '100vh',
        padding: 48,
        boxSizing: 'border-box',
    }}>
        <Section title='Surface — Stack'>
            <SurfaceStack />
        </Section>
        <Section title='Surface — Swatches'>
            <SurfaceSwatches />
        </Section>
        <Section title='Fills'>
            <FillsRow />
        </Section>
        <Section title='Labels'>
            <LabelsRow />
        </Section>
    </div>
);