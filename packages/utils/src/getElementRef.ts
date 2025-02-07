/**
 * This function from https://github.com/radix-ui/primitives/blob/189d292854ade2a673a7a91b64d64c0ec0b08f85/packages/react/slot/src/slot.tsx#L134C1-L151C2
 */

import { ReactElement, Ref } from 'react';

export const getElementRef = (element: ReactElement) => {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, 'ref')?.get;
  let mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element as unknown as { ref: Ref<HTMLElement> }).ref;
  }

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, 'ref')?.get;
  mayWarn = getter && 'isReactWarning' in getter && getter.isReactWarning;
  if (mayWarn) {
    return (element.props as { ref?: Ref<unknown> }).ref;
  }

  // Not DEV
  return (element.props as { ref?: Ref<unknown> }).ref || (element as unknown as { ref: Ref<HTMLElement> }).ref;
}