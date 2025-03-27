type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Fn = (value: JSONValue) => number;

// using built-in sort (TC: O(n log n ) / SC: O(1))
function sortBy1(arr: JSONValue[], fn: Fn): JSONValue[] {
  return arr.sort((a, b) => fn(a) - fn(b));
}

// using built-in toSorted (TC: O(n log n ) / SC: O(n))
function sortBy2(arr: JSONValue[], fn: Fn): JSONValue[] {
  const newArr = arr.toSorted((a, b) => fn(a) - fn(b));
  return newArr;
}
