import { readFile } from "../../../utils/file.js";

const calcMostAndLeast = (binaries) => {
  var most = [];
  var most = [];
  var least = [];
  var ones = [];
  var zeros = [];

  for (const binary_untrimmed of binaries) {
    var binary = binary_untrimmed.trim();
    for (var i = 0; i < binary.length; i++) {
      if (i >= ones.length) {
        ones.push(0); // grow array
        zeros.push(0);
      }

      if (binary[i] === "1") {
        ones[i] = ones[i] + 1;
      } else if (binary[i] === "0") {
        zeros[i] = zeros[i] + 1;
      }
    }
  }

  for (var i = 0; i < ones.length; i++) {
    if (ones[i] >= zeros[i]) {
      most[i] = 1;
      least[i] = 0;
    } else {
      most[i] = 0;
      least[i] = 1;
    }
  }
  return { most, least };
};

const getMostUsedDigits = (binaries) => {
  return calcMostAndLeast(binaries).most;
};
const getLeastUsedDigits = (binaries) => {
  return calcMostAndLeast(binaries).least;
};

const log = (text, ...args) => {
  if (debug) {
    console.log(text, args);
  }
};

const filterBinaries = (binaries, filterArrayFunction) => {
  var filtered_binaries = [...binaries];
  var i = 0;

  while (filtered_binaries.length > 1) {
    const testArr = filterArrayFunction(filtered_binaries);

    log("-----");
    log("Unfiltered:", filtered_binaries);
    log("i:", i);
    log("testArr:", testArr);
    filtered_binaries = filtered_binaries.filter((binary) => {
      log("Testing:", binary);
      log("binary[" + i + "]:", binary[i]);

      if (binary[i] === testArr[i].toString()) {
        log("Keep");
        return true;
      }
      log("Remove");
      return false;
    });
    log("Filtered:", filtered_binaries);
    i++;
  }

  return filtered_binaries[0];
};

const binaries = await readFile("./days/3/part1/input_real.txt");
var debug = false;

var oxygen = parseInt(filterBinaries(binaries, getMostUsedDigits), 2);
var co2 = parseInt(filterBinaries(binaries, getLeastUsedDigits), 2);

console.log("Oxygen:", oxygen);
console.log("CO2:", co2);

console.log("Life support ratinh: ", oxygen * co2);
