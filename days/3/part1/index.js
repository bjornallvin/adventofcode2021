import { readFile } from "../../../utils/file.js";
const binaries = await readFile("./days/3/part1/input_real.txt");

var ones = [];
var zeros = [];

var gamma_binary_string = "";
var epsilon_binary_string = "";

var gamma_decimal = 0;
var epsilon_decimal = 0;

for (const binary_untrimmed of binaries) {
  var binary = binary_untrimmed.trim();
  for (var i = 0; i < binary.length; i++) {
    if (i >= ones.length) {
      ones.push(0);
      zeros.push(0);
    }

    if (binary[i] === "1") {
      ones[i] = ones[i] + 1;
    } else if (binary[i] === "0") {
      zeros[i] = zeros[i] + 1;
    }
  }
}

console.log("ones:", ones);
console.log("zeros:", zeros);

for (var i = 0; i < ones.length; i++) {
  if (ones[i] > zeros[i]) {
    gamma_binary_string += "1";
    epsilon_binary_string += "0";
  } else {
    gamma_binary_string += "0";
    epsilon_binary_string += "1";
  }
}

console.log("Gamma:", gamma_binary_string);
console.log("Epsilon:", epsilon_binary_string);

gamma_decimal = parseInt(gamma_binary_string, 2);
epsilon_decimal = parseInt(epsilon_binary_string, 2);

console.log("Gamma:", gamma_decimal);
console.log("Epsilon:", epsilon_decimal);

console.log("Power consumption: ", gamma_decimal * epsilon_decimal);
