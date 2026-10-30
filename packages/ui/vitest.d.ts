import 'vitest/browser';

declare module 'vitest/browser' {
  interface BrowserCommands {
    emulateReducedMotion: (reducedMotion: 'reduce' | 'no-preference') => Promise<void>
    mouseDrag: (selector: string, distance: number) => Promise<void>
  }
}
