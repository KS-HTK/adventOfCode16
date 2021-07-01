// this code is slightly problematic as it ignores difficult situation (fring microchips)
// it does not work for all inputs
let floors = [["sg", "pg", "sm", "pm"], ["tg", "rg", "cg", "rm", "cm"], ["tm"], []];
console.log("Part 1:", countSteps(floors));
floors = [["sg", "pg", "sm", "pm", "eg", "em", "dg", "dm"], ["tg", "rg", "cg", "rm", "cm"], ["tm"], []];
console.log("Part 2:", countSteps(floors));
function countSteps(floors) {
                   let e = 0;
                   let steps = 0;
                   let elevate = []
                   floors.forEach((floor, i) => {
                       if (i == floors.length-1) return;
                       floor.push(...elevate);
                       steps += ((floor.length*2)-3);
                       elevate = floor;
                   });
                   return steps;
}
