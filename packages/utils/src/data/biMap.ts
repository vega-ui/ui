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
    if (this.keyToValue.has(k)) this.valueToKey.delete(this.keyToValue.get(k) as V);
    if (this.valueToKey.has(v)) this.keyToValue.delete(this.valueToKey.get(v) as K);
    
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
    if (!this.keyToValue.has(k)) return false;
    this.valueToKey.delete(this.keyToValue.get(k) as V);
    this.keyToValue.delete(k);
    return true;
  }
  
  deleteByValue(v: V) {
    if (!this.valueToKey.has(v)) return false;
    this.keyToValue.delete(this.valueToKey.get(v) as K);
    this.valueToKey.delete(v);
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