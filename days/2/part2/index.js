import { readFile } from "../../../utils/file.js";
const instructions = await readFile("./days/2/part1/input_real.txt");

var pos = 0;
var depth = 0;
var aim = 0;

for (const instruction of instructions) {
  const params = instruction.trim().split(" ");

  if (params[0] === "forward") {
    pos += parseInt(params[1]);
    depth += parseInt(params[1]) * aim;

    console.log("forward " + params[1] + " to:" + pos + " depth:" + depth);
  }
  if (params[0] === "down") {
    aim += parseInt(params[1]);
    const log = "down aim " + params[1] + " to:" + aim;
    console.log(log);
  }
  if (params[0] === "up") {
    aim -= parseInt(params[1]);
    const log = "up " + params[1] + " to:" + aim;
    console.log(log);
  }
}

console.log("Answer:", pos * depth);
