// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setValue } from '../setValue';

describe('setValue', () => {
  let input: HTMLInputElement;
  
  beforeEach(() => {
    input = document.createElement('input');
    document.body.appendChild(input);
  });
  
  it('sets the input value', () => {
    setValue(input, 'hello');
    expect(input.value).toBe('hello');
  });
  
  it('calls the native setter when available', () => {
    const proto = Object.getPrototypeOf(input);
    
    const originalDesc =
      Object.getOwnPropertyDescriptor(proto, 'value') ??
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    
    expect(originalDesc?.set).toBeTypeOf('function');
    
    const setterSpy = vi.fn((v: string) => {
      originalDesc!.set!.call(input, v);
    });
    
    Object.defineProperty(proto, 'value', {
      ...originalDesc,
      set: setterSpy,
      configurable: true,
    });
    
    try {
      setValue(input, 'spy-test');
      
      expect(setterSpy).toHaveBeenCalledTimes(1);
      expect(setterSpy).toHaveBeenCalledWith('spy-test');
      expect(input.value).toBe('spy-test');
    } finally {
      Object.defineProperty(proto, 'value', originalDesc!);
    }
  });
});
