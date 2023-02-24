// Stack class with generic type T
export class Stack<T> {
  // Items is a private array of type T
    private items: T[];
  
    // Constructors that initializes items as an empty array
    constructor() {
      this.items = [];
    }

    // Add an item to the end of the stack
    push(item: T) {
      this.items.push(item);
    }
  
    // Removes and returns the last item in the stack, or undefined if the stack is empty
    pop(): T | undefined {
      return this.items.pop();
    }
    
    // Returns True if the stack is empty, false otherwise
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
  
  // This is an interface for a key-value pair
  export interface KeyValuePair<K, V> {
    key: K;
    value: V;
  }
  
  // This is a HashTable class with generic types K and V
  export class HashTable<K, V> {

    // Items is a private two-dimentional array of type KeyValuePair<>K, V>
    private items: Array<Array<KeyValuePair<K, V>>>;
  
    // Constructor that initializes items as a new two-dimentional array with a specified size
    constructor(size: number) {
      this.items = new Array(size);
    }
    
    // Private method that takes a kay of type K and returns a hash code as number
    private hashFunction(key: K): number {
      const strKey = String(key);
      let hash = 0;
      for (let i = 0; i < strKey.length; i++) {
        hash += strKey.charCodeAt(i);
      }
      return hash % this.items.length;
    }
    
    // Adds a key-value pair to the hash table
    set(key: K, value: V) {
      const index = this.hashFunction(key);
      if (!this.items[index]) {
        this.items[index] = [];
      }
      this.items[index].push({ key, value });
    }
    
    // Retrieves the value associated with a gievn key, or undefined if the key is not found
    get(key: K): V | undefined {
      const index = this.hashFunction(key);
      if (!this.items[index]) {
        return undefined;
      }
      const pair = this.items[index].find((pair) => pair.key === key);
      return pair ? pair.value : undefined;
    }
    
    // Removes a key-value pair from the hash-table
    remove(key: K) {
      const index = this.hashFunction(key);
      if (!this.items[index]) {
        return;
      }
      this.items[index] = this.items[index].filter((pair) => pair.key !== key);
    }
    
    // Returns all key-value pairs in teh hash table as a two-dimentional array
    getItems(): Array<Array<KeyValuePair<K, V>>> {
      return this.items;
    }

    // Returns all key-value pairs in teh hash table as a one-dimentional array
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
  