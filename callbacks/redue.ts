type Fn = (accum: number, curr: number) => number;

// basic for
function reduce1(nums: number[], fn: Fn, init: number): number {
  if (!nums.length) return init;

  let acc = init;
  for (let i = 0; i < nums.length; i++) {
    acc = fn(acc, nums[i]);
  }

  return acc;
}

// for...of
function reduce2(nums: number[], fn: Fn, init: number): number {
  if (!nums.length) return init;

  let acc = init;
  for (const n of nums) {
    acc = fn(acc, n);
  }

  return acc;
}

// forEach
function reduce3(nums: number[], fn: Fn, init: number): number {
  if (!nums.length) return init;

  let acc = init;
  nums.forEach((n) => {
    acc = fn(acc, n);
  });

  return acc;
}

// for...in
function reduce4(nums: number[], fn: Fn, init: number): number {
  if (!nums.length) return init;

  let acc = init;
  for (const i in nums) {
    acc = fn(acc, nums[i]);
  }

  return acc;
}
