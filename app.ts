interface IItemValue {
  key: string;
  value: number;
  nextItem: IItemValue | null;
}

class MyMap {
  private buckets: (IItemValue | null)[];
  private size: number;
  private readonly BACKETS_COUNT: number = 16;

  constructor() {
    this.buckets = new Array(this.BACKETS_COUNT).fill(null);
    this.size = 0;
  }

  set(key: string, value: number) {
    const index = this.getBacketIndexKey(key);
    const newNode: IItemValue = { key, value, nextItem: null };

    if (!this.buckets[index]) {
      this.buckets[index] = newNode;
    } else {
      let current: IItemValue | null = this.buckets[index];
      let prev: IItemValue | null = null;
      while (current) {
        if (this.keysEquals(current.key, key)) {
          current.value = value;
          return;
        }
        prev = current;
        current = current.nextItem || null;
      }
      if (prev) prev.nextItem = newNode;
    }
    this.size++;
  }

  get(key: string): number | undefined {
    const index = this.getBacketIndexKey(key);
    let current: IItemValue | null = this.buckets[index];
    while (current) {
      if (this.keysEquals(current.key, key)) {
        return current.value;
      }
      current = current.nextItem || null;
    }
    return undefined;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  clear() {
    this.buckets = new Array(this.BACKETS_COUNT).fill(null);
    this.size = 0;
  }

  getSize(): number {
    return this.size;
  }

  delete(key: string) {
    const index = this.getBacketIndexKey(key);
    let current: IItemValue | null = this.buckets[index];
    let prev: IItemValue | null = null;
    while (current) {
      if (this.keysEquals(current.key, key)) {
        if (prev === null) {
          // Если это первый элемент в цепочке
          this.buckets[index] = current.nextItem;
        } else {
          // Если это не первый элемент
          prev.nextItem = current.nextItem;
        }
        this.size--;
        return true;
      }
      prev = current;
      current = current.nextItem;
    }
    return false; // Ключ не найден
  }

  private getBacketIndexKey(key: string) {
    return this.hash(key) % this.BACKETS_COUNT;
  }

  private hash(key: string): number {
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      hash = (hash << 5) - hash + keyString.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  private keysEquals(key1: string, key2: string): boolean {
    if (typeof key1 === "object" && typeof key2 === "object") {
      return key1 === key2;
    }
    return key1 === key2;
  }
}

let weatherMap = new MyMap();
weatherMap.set("London", 20);
weatherMap.set("asdfasdf", 20);
weatherMap.set("Berlin", 25);
console.log(weatherMap.get("London"));
console.log(weatherMap.delete("asdfasdf"));
console.log(weatherMap.get("asdfasdf"));
