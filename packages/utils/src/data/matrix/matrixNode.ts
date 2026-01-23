export class MatrixNode<P, K = string> {
  public readonly index: [number, number];
  public readonly payload?: P;
  public readonly key?: K
  
  constructor(index: [number, number], key?: K, payload?: P) {
    this.index = index;
    this.payload = payload;
    this.key = key;
  }
}