export class BiMap<K, V> {
  private readonly keyToValue = new Map<K, V>();
  private readonly valueToKey = new Map<V, K>();
  
  constructor(initial?: ReadonlyArray<readonly [K, V]>) {
    if (initial) for (const [k, v] of initial) this.set(k, v);
  }
  
  get size() {
    return this.keyToValue.size;
  }
  
  set(k: K, v: V) {
    const prevV = this.keyToValue.get(k);
    const prevK = this.valueToKey.get(v);
    
    if (prevV !== undefined && prevV !== v) this.valueToKey.delete(prevV);
    if (prevK !== undefined && prevK !== k) this.keyToValue.delete(prevK);
    
    this.keyToValue.set(k, v);
    this.valueToKey.set(v, k);
    return this;
  }
  
  getByKey(k: K) {
    return this.keyToValue.get(k);
  }
  
  getByValue(v: V) {
    return this.valueToKey.get(v);
  }
  
  hasKey(k: K) {
    return this.keyToValue.has(k);
  }
  
  hasValue(v: V) {
    return this.valueToKey.has(v);
  }
  
  deleteByKey(k: K) {
    const v = this.keyToValue.get(k);
    if (v === undefined) return false;
    this.keyToValue.delete(k);
    this.valueToKey.delete(v);
    return true;
  }
  
  deleteByValue(v: V) {
    const k = this.valueToKey.get(v);
    if (k === undefined) return false;
    this.valueToKey.delete(v);
    this.keyToValue.delete(k);
    return true;
  }
  
  clear() {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }
  
  keys() {
    return this.keyToValue.keys();
  }
  
  values() {
    return this.keyToValue.values();
  }
  
  entries() {
    return this.keyToValue.entries();
  }
  
  snapshot(): Array<[K, V]> {
    return Array.from(this.keyToValue.entries());
  }
}