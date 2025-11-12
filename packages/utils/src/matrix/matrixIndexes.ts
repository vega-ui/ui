export class MatrixIndexes {
  readonly indexes: Array<number> = []
  
  remove(index: number) {
    const pos = this.lowerBound(index);
    if (this.indexes[pos] === index) {
      this.indexes.splice(pos, 1);
      return true;
    }
    return false;
  }
  
  add(index: number) {
    let left = 0;
    let right = this.indexes.length;
    
    while (left < right) {
      const mid = (left + right) >> 1;
      if (this.indexes[mid] < index) left = mid + 1;
      else right = mid;
    }
    
    if (this.indexes[left] !== index) {
      this.indexes.splice(left, 0, index);
    }
  }
  
  first() {
    return this.indexes[0]
  }
  
  last() {
    return this.indexes[this.indexes.length - 1]
  }
  
  next(index: number) {
    return this.indexes[index + 1]
  }
  
  prev(index: number) {
    return this.indexes[index - 1]
  }
  
  head(count: number) {
    return this.indexes.slice(0, count)
  }
  
  tail(count: number) {
    return this.indexes.slice(this.indexes.length - count)
  }
  
  private lowerBound(index: number) {
    let l = 0, r = this.indexes.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (this.indexes[m] < index) l = m + 1;
      else r = m;
    }
    return l;
  }
}