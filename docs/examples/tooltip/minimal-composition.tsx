import {
  Button,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Publish</Button>
      </TooltipTrigger>
      <TooltipContent>
        <Text size={2}>Anyone with the link can view the page</Text>
      </TooltipContent>
    </Tooltip>
  );
}
