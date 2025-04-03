// in-place
function map1(arr: number[], fn: (n: number, i: number) => number): number[] {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = fn(arr[i], i);
  }

  return arr;
}

// extra-space
function map2(arr: number[], fn: (n: number, i: number) => number): number[] {
  const copy: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    copy.push(fn(arr[i], i));
  }

  return copy;
}
