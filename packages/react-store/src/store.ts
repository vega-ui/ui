export type EqualityFn<T> = (a: T, b: T) => boolean

export type StoreNotify<Tag> = {
  all?: boolean
  tags?: readonly Tag[]
}

export class Store<T, Tag = unknown> {
  private value: T
  private all = new Set<() => void>()
  private byTag = new Map<Tag, Set<() => void>>()
  
  constructor(initial: T) {
    this.value = initial
  }
  
  notifyAll() {
    this.all.forEach((l) => l())
  }
  
  notifyByTag(tags: readonly Tag[]) {
    if (tags.length === 0) return
    
    for (const tag of tags) {
      const set = this.byTag.get(tag)
      if (!set) continue
      
      set.forEach((l) => l())
    }
  }
  
  getValue(): T {
    return this.value
  }
  
  setValue(value: T, options?: { notify?: StoreNotify<Tag> }) {
    const prev = this.value
    if (Object.is(prev, value)) return
    
    this.value = value
    
    const notify = options?.notify
    
    if (notify?.all) {
      this.notifyAll()
      return
    }
    
    this.notifyByTag(notify?.tags ?? [])
  }
  
  subscribeAll(listener: () => void) {
    this.all.add(listener)
    return () => this.all.delete(listener)
  }
  
  subscribeTag(tag: Tag, listener: () => void) {
    let set = this.byTag.get(tag)
    
    if (!set) {
      set = new Set()
      this.byTag.set(tag, set)
    }
    
    set.add(listener)
    
    return () => {
      const s = this.byTag.get(tag)
      if (!s) return
      s.delete(listener)
      if (s.size === 0) this.byTag.delete(tag)
    }
  }
}