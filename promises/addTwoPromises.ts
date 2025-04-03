type P = Promise<number>;

// basic approach
async function addTwoPromises1(promise1: P, promise2: P): P {
  try {
    const first = await promise1;
    const second = await promise2;

    return first + second;
  } catch (err) {
    console.error("Error: ", err);
  }
}

// Promise.all approach
async function addTwoPromises2(promise1: P, promise2: P): P {
  try {
    const result = await Promise.all([promise1, promise2]);
    return result.reduce((acc, cur) => acc + cur, 0);
  } catch (err) {
    console.error("Error: ", err);
  }
}

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */
