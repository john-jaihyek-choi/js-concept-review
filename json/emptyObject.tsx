type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };
type Obj = Record<string, JSONValue> | JSONValue[];

function isEmpty(obj: Obj): boolean {
  return Object.keys(obj).length == 0;
}

// Key takeaway:
// In Javascript, only a specific values are "falsey"
// false, 0, "", null, undefined, NaN
