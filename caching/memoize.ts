type Fn = (...params: number[]) => number;

// using toString
function memoize1(fn: Fn): Fn {
  const cache = new Map();
  let callCount = 0;

  return function (...args) {
    const arrStr = args.toString();
    if (cache.has(arrStr)) {
      return cache.get(arrStr);
    }
    const ans = fn(...args);
    cache.set(arrStr, ans);

    return ans;
  };
}

// using stringify
function memoize2(fn: Fn): Fn {
  const cache = new Map();
  let callCount = 0;

  return function (...args) {
    const arrStr = JSON.stringify(args);
    if (cache.has(arrStr)) {
      return cache.get(arrStr);
    }
    const ans = fn(...args);
    cache.set(arrStr, ans);

    return ans;
  };
}

/**
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1
 */
