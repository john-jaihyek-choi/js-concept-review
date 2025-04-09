type MultiDimensionalArray = (number | MultiDimensionalArray)[];

var flat = function (
  arr: MultiDimensionalArray,
  n: number
): MultiDimensionalArray {
  /* // intuition:
    // recursively push elements to the result array
    // recursion:
        // if item is Array && current_depth >= n:
            // recurse with depth + 1
        // else:
            // push the item to the result array
    // general step
        // initialize results array
        // iterate arr:
            // recurse starting depth at 0
        // return the results array
*/
  const results: MultiDimensionalArray = [];

  const recurse = (depth: number, item: MultiDimensionalArray | number) => {
    if (Array.isArray(item) && depth < n) {
      for (const el of item) {
        recurse(depth + 1, el);
      }
    } else {
      results.push(item);
    }
  };

  for (const item of arr) {
    recurse(0, item);
  }

  return results;
};
