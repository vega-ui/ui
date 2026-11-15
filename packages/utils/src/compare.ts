export type Comparable = number | string | bigint | Date;

export const compare = <Item extends Comparable>(a: Item, b: Item): -1 | 0 | 1 => {
  if (Object.is(a, b)) return 0;

  if (a.valueOf() < b.valueOf()) return -1;
  if (a.valueOf() > b.valueOf()) return 1;

  return 0;
};
