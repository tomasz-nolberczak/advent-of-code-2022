import {
  getRelativeToUtilsFileLocation,
  readFileLineByLine,
} from "../_utils/files"

const lines = readFileLineByLine(
  getRelativeToUtilsFileLocation("../04/input.txt")
)

const createArray = (start: number, end: number) => {
  let array = []

  for (let i = start; i <= end; i++) {
    array.push(i)
  }

  return array
}

let numberOfOverlappingPairsByRange = 0
let numberOfOverlappingPairsAtAll = 0

lines.forEach((line: string) => {
  const sections = line.split(",")
  const firstSectionList = sections[0]
  const secondSectionList = sections[1]

  const leftFieldStartsAt = parseInt(firstSectionList.split("-")[0])
  const leftFieldEndsAt = parseInt(firstSectionList.split("-")[1])

  const rightFieldStartsAt = parseInt(secondSectionList.split("-")[0])
  const rightFieldEndsAt = parseInt(secondSectionList.split("-")[1])

  if (
    (leftFieldStartsAt <= rightFieldStartsAt &&
      leftFieldEndsAt >= rightFieldEndsAt) ||
    (rightFieldStartsAt <= leftFieldStartsAt &&
      rightFieldEndsAt >= leftFieldEndsAt)
  ) {
    numberOfOverlappingPairsByRange++
  }

  /**
   * This could be improved, I couldn't write proper conditions to match all edge-cases, so that's why you can see there array creations
   */
  const arr1 = createArray(leftFieldStartsAt, leftFieldEndsAt)
  const arr2 = createArray(rightFieldStartsAt, rightFieldEndsAt)

  if (arr1.some((r) => arr2.includes(r))) numberOfOverlappingPairsAtAll++
})

console.log("ANSWER #1", numberOfOverlappingPairsByRange)
console.log("ANSWER #2", numberOfOverlappingPairsAtAll)
