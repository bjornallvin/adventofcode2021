import * as fs from "fs";

export const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        var array = data.toString().split("\r\n");
        resolve(array);
      }
    });
  });
};
export default readFile;
