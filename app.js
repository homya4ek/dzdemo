"use strict";
class MyMap {
    constructor() {
        this.BACKETS_COUNT = 16;
        this.buckets = new Array(this.BACKETS_COUNT).fill(null);
        this.size = 0;
    }
    set(key, value) {
        const index = this.getBacketIndexKey(key);
        const newNode = { key, value, nextItem: null };
        if (!this.buckets[index]) {
            this.buckets[index] = newNode;
        }
        else {
            let current = this.buckets[index];
            let prev = null;
            while (current) {
                if (this.keysEquals(current.key, key)) {
                    current.value = value;
                    return;
                }
                prev = current;
                current = current.nextItem || null;
            }
            if (prev)
                prev.nextItem = newNode;
        }
        this.size++;
    }
    get(key) {
        const index = this.getBacketIndexKey(key);
        let current = this.buckets[index];
        while (current) {
            if (this.keysEquals(current.key, key)) {
                return current.value;
            }
            current = current.nextItem || null;
        }
        return undefined;
    }
    has(key) {
        return this.get(key) !== undefined;
    }
    clear() {
        this.buckets = new Array(this.BACKETS_COUNT).fill(null);
        this.size = 0;
    }
    getSize() {
        return this.size;
    }
    delete(key) {
        const index = this.getBacketIndexKey(key);
        let current = this.buckets[index];
        let prev = null;
        while (current) {
            if (this.keysEquals(current.key, key)) {
                if (prev === null) {
                    // Если это первый элемент в цепочке
                    this.buckets[index] = current.nextItem;
                }
                else {
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
    getBacketIndexKey(key) {
        return this.hash(key) % this.BACKETS_COUNT;
    }
    hash(key) {
        const keyString = String(key);
        let hash = 0;
        for (let i = 0; i < keyString.length; i++) {
            hash = (hash << 5) - hash + keyString.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }
    keysEquals(key1, key2) {
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
