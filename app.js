"use strict";
class MyMap {
    constructor() {
        this.BACKETS_COUNT = 16;
        this.buckets = new Array(this.BACKETS_COUNT).fill(null);
        this.size = 0;
    }
    add(key, value) {
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
weatherMap.add("London", 20);
weatherMap.add("Berlin", 25);
console.log(weatherMap.get("London"));
