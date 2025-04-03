type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | Array<JSONValue>;

// using slice
function chunk1(arr: Obj[], size: number): Obj[][] {
  const newChunk = [];
  for (let i = 0; i < arr.length; i += size) {
    newChunk.push(arr.slice(i, i + size));
  }

  return newChunk;
}

// non-slice approach
function chunk2(arr: Obj[], size: number): Obj[][] {
  const newChunk = [];
  for (let i = 0; i < arr.length; i += size) {
    const partition = [];
    for (let j = i; j < i + size; j++) {
      if (j < arr.length) partition.push(arr[j]);
    }

    newChunk.push(partition);
  }

  return newChunk;
}
