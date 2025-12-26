// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { dispatchEvents } from '../dispatchEvents';

describe('dispatchEvents', () => {
  let input: HTMLInputElement;
  
  beforeEach(() => {
    input = document.createElement('input');
    document.body.appendChild(input);
  });
  
  it('dispatches input and change events with bubbles=true by default', () => {
    const inputListener = vi.fn();
    const changeListener = vi.fn();
    
    input.addEventListener('input', inputListener);
    input.addEventListener('change', changeListener);
    
    dispatchEvents(input);
    
    expect(inputListener).toHaveBeenCalledTimes(1);
    expect(changeListener).toHaveBeenCalledTimes(1);
    
    const inputEvent = inputListener.mock.calls[0][0] as InputEvent;
    const changeEvent = changeListener.mock.calls[0][0] as Event;
    
    expect(inputEvent.bubbles).toBe(true);
    expect(inputEvent.composed).toBe(true);
    expect(changeEvent.bubbles).toBe(true);
  });
  
  it('respects bubbles=false option', () => {
    const inputListener = vi.fn();
    const changeListener = vi.fn();
    
    input.addEventListener('input', inputListener);
    input.addEventListener('change', changeListener);
    
    dispatchEvents(input, { bubbles: false });
    
    expect(inputListener).toHaveBeenCalledTimes(1);
    expect(changeListener).toHaveBeenCalledTimes(1);
    
    const inputEvent = inputListener.mock.calls[0][0] as InputEvent;
    const changeEvent = changeListener.mock.calls[0][0] as Event;
    
    expect(inputEvent.bubbles).toBe(false);
    expect(inputEvent.composed).toBe(true);
    expect(changeEvent.bubbles).toBe(false);
  });
  
  it('events bubble to parent when bubbles=true', () => {
    const wrapper = document.createElement('div');
    const parentListener = vi.fn();
    
    wrapper.appendChild(input);
    document.body.appendChild(wrapper);
    
    wrapper.addEventListener('input', parentListener);
    wrapper.addEventListener('change', parentListener);
    
    dispatchEvents(input);
    
    expect(parentListener).toHaveBeenCalledTimes(2);
  });
  
  it('events do not bubble to parent when bubbles=false', () => {
    const wrapper = document.createElement('div');
    const parentListener = vi.fn();
    
    wrapper.appendChild(input);
    document.body.appendChild(wrapper);
    
    wrapper.addEventListener('input', parentListener);
    wrapper.addEventListener('change', parentListener);
    
    dispatchEvents(input, { bubbles: false });
    
    expect(parentListener).not.toHaveBeenCalled();
  });
});
