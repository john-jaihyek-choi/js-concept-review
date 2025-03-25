type Fn = (...params: any[]) => Promise<any>;

function timeLimit(fn: Fn, t: number): Fn {
  return async function (...args) {
    const res = await new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          reject("Time Limit Exceeded");
        }, t);
        fn(...args)
          .then(resolve)
          .catch(reject);
      } catch (err) {
        console.error(err);
      }
    });

    return res;
  };
}

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */
