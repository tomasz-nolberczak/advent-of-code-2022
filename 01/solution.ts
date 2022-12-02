import { getRelativeToUtilsFileLocation, readFileLineByLine } from "../_utils/files"

let index = 0
let elves: number[] = []

readFileLineByLine(getRelativeToUtilsFileLocation("../01/input.txt")).forEach(function (
  lineValue: string
) {
  if (lineValue === "") {
    index++
  } else {
    if (typeof elves[index] === "undefined") {
      elves.push(0)
    }
    elves[index] += parseInt(lineValue)
  }
})

const topThreeElves = elves
  .sort((a, b) => {
    const aIsGreaterThanB = a > b

    return aIsGreaterThanB ? -1 : 1
  })
  .slice(0, 3)

const caloriesOfFirstElf = topThreeElves[0]
const caloriesOfThreeElvesCombined = topThreeElves.reduce(
  (prev, curr) => prev + curr,
  0
)

console.log(`ANSWER #1 ${caloriesOfFirstElf}`)
console.log(`ANSWER #2 ${caloriesOfThreeElvesCombined}`)
