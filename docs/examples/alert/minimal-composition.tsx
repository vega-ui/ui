import {
  Alert,
  AlertContent,
  AlertIcon,
  AlertMain,
  AlertTitle,
} from '@vega-ui/react';

export default function MinimalComposition() {
  return (
    <Alert variant='success' style={{ width: '100%' }}>
      <AlertIcon />
      <AlertMain>
        <AlertTitle>Saved</AlertTitle>
        <AlertContent>Profile updated successfully.</AlertContent>
      </AlertMain>
    </Alert>
  );
}
