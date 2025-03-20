type ToBeOrNotToBe = {
  toBe: (val: any) => boolean | void;
  notToBe: (val: any) => boolean | void;
};

function expect(val: any): ToBeOrNotToBe {
  const toBe = (comp_val: any): boolean | void => {
    if (comp_val === val) return true;
    throw new Error("Not Equal");
  };

  const notToBe = (comp_val: any): boolean | void => {
    if (comp_val !== val) return true;
    throw new Error("Equal");
  };

  return {
    toBe,
    notToBe,
  };
}

expect(5).toBe(5); // true
expect(5).notToBe(5); // throws "Equal"
