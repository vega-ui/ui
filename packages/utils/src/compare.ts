export type Comparable = number | string | bigint | Date;

export const compare = <T extends Comparable>(a: T, b: T): -1 | 0 | 1 => {
  if (Object.is(a, b)) return 0;

  if (a.valueOf() < b.valueOf()) return -1;
  if (a.valueOf() > b.valueOf()) return 1;

  return 0;
};
