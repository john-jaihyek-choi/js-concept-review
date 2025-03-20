type Counter = {
  increment: () => number;
  decrement: () => number;
  reset: () => number;
};

function createCounter(init: number): Counter {
  const original = init;

  const increment = () => {
    return ++init;
  };

  const decrement = () => {
    return --init;
  };

  const reset = () => {
    return (init = original);
  };

  return {
    increment,
    decrement,
    reset,
  };
}

// const counter = createCounter(5);
// counter.increment(); // 6
// counter.reset(); // 5
// counter.decrement(); // 4
