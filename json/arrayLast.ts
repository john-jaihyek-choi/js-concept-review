interface Array<T> {
  groupBy(fn: (item: T) => string): Record<string, T[]>;
}

// TC: O(n) / SC: O(n)
Array.prototype.groupBy = function (fn) {
  const result = {};
  for (let i = 0; i < this.length; i++) {
    const key = fn(this[i]);
    if (!result[key]) result[key] = [];
    result[key].push(this[i]);
  }

  return result;
};

// for...of...
Array.prototype.groupBy = function (fn) {
  const result = {};
  for (const item of this) {
    const key = fn(item);

    if (!result[key]) result[key] = [];
    result[key].push(item);
  }

  return result;
};

// ||= (or equal to) trick
Array.prototype.groupBy = function (fn) {
  const result = {};
  for (const item of this) {
    const key = fn(item);

    result[key] ||= [];
    result[key].push(item);
  }

  return result;
};

// use arr.reduce
Array.prototype.groupBy = function (fn) {
  return this.reduce((acc, cur) => {
    const key = fn(cur);

    acc[key] ||= [];
    acc[key].push(cur);

    return acc;
  }, {});
};

/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */
