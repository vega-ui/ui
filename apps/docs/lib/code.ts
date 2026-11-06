export const COLLAPSED_LINES = 9;
export const PREVIEW_LINES = 12;

export const codeKey = (code: string) => {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;

  for (let index = 0; index < code.length; index += 1) {
    const char = code.charCodeAt(index);
    h1 = Math.imul(h1 ^ char, 2654435761);
    h2 = Math.imul(h2 ^ char, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
};

export const codeUrl = (code: string) => `${process.env.NEXT_PUBLIC_BASE_PATH}/code/${codeKey(code)}.html`;

export const isPartial = (code: string) => code.split('\n').length > PREVIEW_LINES;
