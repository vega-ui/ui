export const setValue = (input: HTMLInputElement, value: string) => {
  const desc =
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value') ??
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
  
  desc?.set?.call(input, value);
}