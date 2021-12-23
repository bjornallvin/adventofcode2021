import { readFile } from "../../../utils/file.js";
const input = await readFile("./days/1/input_real.txt");

var increases = 0;
var total = 0;
var decreases = 0;

input.reduce((prev, current) => {
  console.log("Prev:", prev);
  console.log("Current:", current);
  console.log(parseInt(prev) < parseInt(current) ? "increased" : "decreased");
  parseInt(current) > parseInt(prev) ? increases++ : decreases++;
  console.log("----");
  total++;
  return current;
});

console.log("Increases:", increases);
console.log("Decreases:", decreases);
console.log("Total:", total);
