// Initial Try
interface KeyVal {
  [key: number]: {
    value: number;
    exp: NodeJS.Timeout;
  };
}

class TimeLimitedCache1 {
  items: KeyVal = {};

  set(key: number, value: number, duration: number): boolean {
    let res = false;

    if (key in this.items) {
      clearTimeout(this.items[key].exp);
      res = true;
    }

    this.items[key] = {
      value,
      exp: setTimeout(() => delete this.items[key], duration),
    };

    return res;
  }

  get(key: number): number {
    if (key in this.items) {
      return this.items[key]["value"];
    }

    return -1;
  }

  count(): number {
    return Object.entries(this.items).length;
  }
}

// Cleaner code
interface CacheValue {
  value: number;
  exp: NodeJS.Timeout;
}

class TimeLimitedCache2 {
  cache: Map<number, CacheValue>;
  constructor() {
    this.cache = new Map();
  }

  set(key: number, value: number, duration: number): boolean {
    let res = false;

    if (this.cache.has(key)) {
      const item = this.cache.get(key);
      clearTimeout(item!.exp);
      res = true;
    }

    this.cache.set(key, {
      value,
      exp: setTimeout(() => this.cache.delete(key), duration),
    });

    return res;
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      return this.cache.get(key)!.value;
    }

    return -1;
  }

  count(): number {
    return this.cache.size;
  }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
