let num = 3017957

console.log("Part 1:", getLast(num));
console.log("Part 2:", getLast2(num));

function getLast(num) {
  hasPresent = new Array(num).fill(true)
  do {
    for (let i = 0; i < hasPresent.length; i++) {
      if (hasPresent[i]) {
        j = i+1
        while (true) {
          if (j == hasPresent.length) {
            j = 0
          }
          if (hasPresent[j]) {
            hasPresent[j] = false
            break
          }
          j++
        }
      }
    }
    trueCount = 0
    hasPresent.forEach(b => {if (b) trueCount++});
  } while (trueCount > 1)
  for (let i = 0; i < hasPresent.length; i++) {
    if (hasPresent[i]) return i+1
  }
}

/** Part 2
 * 
 * Part 2 was a bit tricky but looking at the results for <1000 quickly reveals the math
 * With 3 eleves the last one wins same for 9 and 27 and 81
 * so for 3^n the last elf will win.
 * after that it starts back at 1 up to 3^n [num-(3^n) where 3^n < num and 2*(3^n) > num]
 * from there it goes in +2 to 3^(n+1) [(num - (2*(3^n)))*2+3^n where 2*(3^n) < num and 3^(n+1) > num]
 */
function getLast2(num) {
  lastIdent = 3
  while (lastIdent*3<num) {
    lastIdent *= 3
  }
  if (lastIdent*2 >= num) {
    return num - lastIdent
  }
  else {
    return (num-(lastIdent*2))*2+lastIdent
  }
}

