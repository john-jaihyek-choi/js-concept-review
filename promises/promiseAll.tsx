type Fn<T> = () => Promise<T>;

// Custom implementation of promise.all
function promiseAll1<T>(functions: Fn<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const promises: T[] = new Array(functions.length).fill(null);
    let resolvedCount = 0;

    functions.forEach(async (fn, i) => {
      try {
        const fnResult = await fn();
        promises[i] = fnResult;
        resolvedCount++;
        if (resolvedCount === functions.length) {
          resolve(promises);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Using Promise.all
function promiseAll2<T>(functions: Fn<T>[]): Promise<T[]> {
  const collections = functions.map((fn) => {
    return fn();
  });

  return Promise.all(collections);
}

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
