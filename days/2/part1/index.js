import { readFile } from "../../../utils/file.js";
const instructions = await readFile("./days/2/part1/input_real.txt");

var pos = 0;
var depth = 0;

var parts = [];

var offset = 0;

for (const instruction of instructions) {
  const params = instruction.trim().split(" ");
  if (params[0] === "forward") {
    pos += parseInt(params[1]);
    const log = "forward " + params[1] + " to:" + pos;
    console.log(log);
  }
  if (params[0] === "down") {
    depth += parseInt(params[1]);
    const log = "down " + params[1] + " to:" + depth;
    console.log(log);
  }
  if (params[0] === "up") {
    depth -= parseInt(params[1]);
    const log = "up " + params[1] + " to:" + depth;
    console.log(log);
  }
}

console.log("Answer:", pos * depth);
