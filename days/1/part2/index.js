import { readFile } from "../../../utils/file.js";
const input = await readFile("./days/1/part2/input_real.txt");

var increases = 0;
var total = 0;
var decreases = 0;

var parts = [];

var offset = 0;

for (var i = 0; i < input.length - 2; i++) {
  parts[i] =
    parseInt(input[i]) + parseInt(input[i + 1]) + parseInt(input[i + 2]);
}

parts.reduce((prev, current) => {
  parseInt(current) > parseInt(prev) ? increases++ : decreases++;
  total++;
  return current;
});

console.log("Increases:", increases);
