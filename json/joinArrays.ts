import _ from "lodash";

type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type ArrayType = { id: number } & Record<string, JSONValue>;

export function join1(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  // initial idea
  // use hashmap to store arr1's items (arr1Hash)
  // iterate arr1 (item = arr1[i])
  // get id of the item (id = item.id)
  // add id to arr1Hash:
  // id as a key
  // the entire item as a value
  // then iterate on arr2 (item = arr2[i])
  // get id of the item (id = item.id)
  // if an id exists in the arr1Hash:
  // combine the two objects and push to the results arr
  // else:
  // push item to the results arr

  // generally works but output limit exceeded - using more than storage allowed due to extra overlaps array
  // TC: O( (n+m) log (n+m)) / SC: O(n + m)
  const arr1Hash: { [key: number]: ArrayType } = {}; // SC: O(n + m)

  for (const item of arr1) {
    // TC: O(n)
    arr1Hash[item.id] = item;
  }

  const overlaps = []; // SC: O(n + m)

  for (const item of arr2) {
    // TC: O(n)
    const id = item.id;

    if (id in arr1Hash) {
      overlaps.push({ ...arr1Hash[id], ...item });
      delete arr1Hash[id];
    } else {
      overlaps.push(item);
    }
  }

  const res = Object.values(arr1Hash); // TC: O(n + m)
  res.push(...overlaps); // TC: O(n + m)

  return res.sort((a, b) => a.id - b.id); // TC: O( (n+m) log (n+m))
}

export function join2(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  // iterating to add the merging properties rather than deleting in hashmap and manually iterating and adding

  // TC: O( (n+m) log (n+m)) / SC: O(n + m)
  const arr1Map: { [key: number]: ArrayType } = {};

  for (const item of arr1) {
    arr1Map[item.id] = item;
  }

  for (const item of arr2) {
    const id = item.id;

    if (id in arr1Map) {
      arr1Map[id] = { ...arr1Map[id], ...item };
    } else {
      arr1Map[id] = item;
    }
  }

  const res = Object.values(arr1Map);

  return res.sort((a, b) => a.id - b.id);
}

export function join3(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  // iterate the matching item object and copy manually rather than making new object

  // TC: O( (n+m) log (n+m)) / SC: O(n + m)
  const arr1Map: { [key: number]: ArrayType } = {}; // SC: O(n + m)

  for (const item of arr1) {
    // TC: O(n)
    arr1Map[item.id] = item;
  }

  for (const item of arr2) {
    // TC: O(m)
    const id = item.id;

    if (id in arr1Map) {
      for (const key of Object.keys(item)) {
        // TC: O(k)
        arr1Map[id][key] = item[key];
      }
    } else {
      arr1Map[id] = item;
    }
  }

  const res = Object.values(arr1Map); // TC: O(n + m)

  return res.sort((a, b) => a.id - b.id); // TC: O((n+m) log (n + m))
}

export function join4(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  // Use maps

  // TC: O( (n+m) log (n+m)) / SC: O(n + m)
  const map = new Map<number, ArrayType>();

  for (const item of arr1) {
    map.set(item.id, item);
  }

  for (const item of arr2) {
    const id = item.id;

    if (map.has(id)) {
      map.set(id, { ...map.get(id), ...item });
    } else {
      map.set(item.id, item);
    }
  }

  return [...map.values()].sort((a, b) => a.id - b.id);
}

export function join5(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  // other idea:
  // combine arr1 and arr2 to begin with (combinedArr)
  // initialize an empty object to store merged objects with same id (merged)
  // iterate the combinedArr (item = combinedArr[i])
  // if merged[item.id]:
  // merged[item.id] = {...merged[item.id], ...item}
  // else:
  // merged[item.id] = item
  // return mergedObject.values

  // TC: O( (n+m) log n) / SC: O(n + m)
  const combinedArr = arr1.concat(arr2); // SC: O(n + m)
  const merged: { [key: number]: ArrayType } = {}; // SC: O(n + m)

  for (const item of combinedArr) {
    // TC: O(n + m)
    if (merged[item.id]) {
      merged[item.id] = { ...merged[item.id], ...item };
    } else {
      merged[item.id] = item;
    }
  }

  return Object.values(merged);
}

export function join6(arr1: ArrayType[], arr2: ArrayType[]): ArrayType[] {
  // use lodash library

  //
  const mergedArray = _.merge({}, ...arr1, ...arr2);

  return mergedArray;
}

const arr1 = [
  { id: 1, x: 2, y: 3 },
  { id: 2, x: 3, y: 6 },
];
const arr2 = [
  { id: 2, x: 10, y: 20 },
  { id: 3, x: 0, y: 0 },
];

console.log(join6(arr1, arr2));
