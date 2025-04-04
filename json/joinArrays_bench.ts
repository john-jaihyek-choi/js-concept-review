import { join1, join2, join3, join4, join5 } from "./joinArrays.ts";

const arr1 = [
  { id: 1, x: 2, y: 3 },
  { id: 2, x: 3, y: 6 },
];
const arr2 = [
  { id: 2, x: 10, y: 20 },
  { id: 3, x: 0, y: 0 },
];

Deno.bench({
  name: "plain object with overlaps array",
  group: "joinArrays",
  fn() {
    join1(arr1, arr2);
  },
});

Deno.bench({
  name: "plain object with making new object for merged items",
  group: "joinArrays",
  fn() {
    join2(arr1, arr2);
  },
});

Deno.bench({
  name: "plain object with updating existing matching item in-place",
  group: "joinArrays",
  fn() {
    join3(arr1, arr2);
  },
});

Deno.bench({
  name: "Using map instead of plain object",
  group: "joinArrays",
  fn() {
    join4(arr1, arr2);
  },
});

Deno.bench({
  name: "combine 2 arr and update matching item in merged object",
  group: "joinArrays",
  fn() {
    join5(arr1, arr2);
  },
});
