const fs = require("fs");

let rawdata = fs.readFileSync("./day18/input");
let data = rawdata.toString().trim();
let trapPatterns = ["^^.", ".^^", "^..", "..^"];
let field = [data];

field = expandField(field, 40);
console.log("Part 1:", countSafe(field));
field = expandField(field, 400000);
console.log("Part 2:", countSafe(field));

function expandField(field, finalLength) {
  if (field.length == finalLength) {
    return field;
  }
  while (field.length < finalLength) {
    const last = field[field.length - 1];
    let newL = "";
    for (let index = 0; index < last.length; index++) {
      let left = last[index - 1];
      let center = last[index];
      let right = last[index + 1];
      left = left == undefined ? "." : left;
      right = right == undefined ? "." : right;
      let sequence = left + center + right;
      if (trapPatterns.includes(sequence)) {
        newL += "^";
      } else {
        newL += ".";
      }
    }
    field.push(newL);
  }
  return field;
}

function countSafe(field) {
  let safe = 0;
  field.forEach((line) => {
    for (const tile of line) {
      if (tile == ".") {
        safe += 1;
      }
    }
  });
  return safe;
}
