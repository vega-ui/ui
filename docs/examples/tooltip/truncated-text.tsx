import {
  Text,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

const files = [
  'Kestrel Robotics – Master services agreement – signed – final v7 (2).pdf',
  'Q3 board deck.pdf',
  'Brand guidelines 2026 – typography, colour, photography and tone of voice.fig',
];

export default function TruncatedText() {
  return (
    <ul
      style={{
        display: 'grid',
        boxSizing: 'border-box',
        width: '100%',
        margin: 0,
        paddingInline: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-2)',
        listStyle: 'none',
        background: 'var(--surface-primary)',
        border: '1px solid var(--separator-opaque)',
        borderRadius: 'var(--radius-5)',
      }}
    >
      {files.map((file, index) => (
        <li key={file} style={{ minWidth: 0, paddingBlock: 'var(--spacing-5)', borderBlockStart: index > 0 ? '1px solid var(--separator-opaque)' : undefined }}>
          <Tooltip delayOpen={300}>
            <TooltipTrigger asChild>
              <a
                href={`#${encodeURIComponent(file)}`}
                style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'inherit' }}
              >
                {file}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              <Text size={2} style={{ display: 'block', maxWidth: 280, overflowWrap: 'anywhere' }}>{file}</Text>
            </TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
