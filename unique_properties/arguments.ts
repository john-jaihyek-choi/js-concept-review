type JSONValue =
  | null
  | boolean
  | number
  | string
  | JSONValue[]
  | { [key: string]: JSONValue };

// arguments object
function argumentsLength1(...args: JSONValue[]): number {
  return arguments.length;
}

// rest operator
function argumentsLength2(...args: JSONValue[]): number {
  return args.length;
}

/**
 * argumentsLength(1, 2, 3); // 3
 */
