export const getTemplateMask = (template: string, segment: RegExp) => Array.from(template, (char) => segment.test(char) ? /\d/ : char)
