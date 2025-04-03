type F = (x: number) => number;

// basic for
function compose1(functions: F[]): F {
  return function (x) {
    if (!functions.length) return x;

    let newX = x;

    for (let i = functions.length - 1; i >= 0; i--) {
      console.log(newX);
      newX = functions[i](newX);
    }

    return newX;
  };
}

// reduceRight
function compose2(functions: F[]): F {
  return function (x) {
    if (!functions.length) return x;

    let newX = x;

    return functions.reduceRight((acc, fn) => fn(acc), newX);
  };
}

// preserve this for context of each object it's originally part of
function compose3(functions: F[]): F {
  return function (x) {
    if (!functions.length) return x;

    let newX = x;

    return functions.reduceRight((acc, fn) => fn.call(this, acc), newX); // "this" passed into call will preserve the context of the fn being called
  };
}

// preserve this using apply
function compose4(functions: F[]): F {
  return function (x) {
    if (!functions.length) return x;

    let newX = x;

    return functions.reduceRight((acc, fn) => fn.apply(this, [acc]), newX); // "this" passed into apply will preserve the context of the fn being called
  };
}

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
