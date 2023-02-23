export class Stack<T> {
    private items: T[];
  
    constructor() {
      this.items = [];
    }
  
    push(item: T) {
      this.items.push(item);
    }
  
    pop(): T | undefined {
      return this.items.pop();
    }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
  
  export interface KeyValuePair<K, V> {
    key: K;
    value: V;
  }
  
  export class HashTable<K, V> {
    private items: Array<Array<KeyValuePair<K, V>>>;
  
    constructor(size: number) {
      this.items = new Array(size);
    }
  
    private hashFunction(key: K): number {
      const strKey = String(key);
      let hash = 0;
      for (let i = 0; i < strKey.length; i++) {
        hash += strKey.charCodeAt(i);
      }
      return hash % this.items.length;
    }
  
    set(key: K, value: V) {
      const index = this.hashFunction(key);
      if (!this.items[index]) {
        this.items[index] = [];
      }
      this.items[index].push({ key, value });
    }
  
    get(key: K): V | undefined {
      const index = this.hashFunction(key);
      if (!this.items[index]) {
        return undefined;
      }
      const pair = this.items[index].find((pair) => pair.key === key);
      return pair ? pair.value : undefined;
    }
  
    remove(key: K) {
      const index = this.hashFunction(key);
      if (!this.items[index]) {
        return;
      }
      this.items[index] = this.items[index].filter((pair) => pair.key !== key);
    }
  
    getItems(): Array<Array<KeyValuePair<K, V>>> {
      return this.items;
    }
    getAllEntries(): Array<KeyValuePair<K, V>> {
      const entries: Array<KeyValuePair<K, V>> = [];
  
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i]) {
          this.items[i].forEach((pair) => {
            entries.push(pair);
          });
        }
      }
  
      return entries;
    }
  }
  