export const safeSetPointerCapture = (target: HTMLElement, pointerId: number): boolean => {
  // Safari / Firefox / synthetic events may throw
  if (typeof target.setPointerCapture !== 'function') return false;
  
  try {
    if (!target.hasPointerCapture(pointerId)) {
      target.setPointerCapture(pointerId);
    }
    
    return true;
  } catch {
    return false;
  }
};