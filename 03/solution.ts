import {
  getRelativeToUtilsFileLocation,
  readFileLineByLine,
} from "../_utils/files"

const getIndexOfLetter = (letter: string) => {
  if (letter.length > 1) letter = letter[0]

  return (
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(letter) + 1
  )
}

const splitStringIntoTwoParts = (text: string) => {
  return [
    text.slice(0, text.length / 2),
    text.slice(text.length / 2, text.length),
  ]
}

const findCommonLetterInTwoParts = (parts: string[]) => {
  let commonLetter = ""

  for (let i = 0; i < parts[0].length; i++) {
    const letterFromFirstBatch = parts[0][i]

    if (parts[1].includes(letterFromFirstBatch)) {
      commonLetter = letterFromFirstBatch
    }
  }

  return commonLetter
}

const findCommonLetterInThreeParts = (parts: string[]) => {
  let commonLetter = ""

  for (let i = 0; i < parts[0].length; i++) {
    const letterFromFirstBatch = parts[0][i]

    if (
      parts[1].includes(letterFromFirstBatch) &&
      parts[2].includes(letterFromFirstBatch)
    ) {
      commonLetter = letterFromFirstBatch
    }
  }

  return commonLetter
}

const lines = readFileLineByLine(
  getRelativeToUtilsFileLocation("../03/input.txt")
)

let totalSumOfPriorities = 0

lines.forEach((line) => {
  const commonLetter = findCommonLetterInTwoParts(splitStringIntoTwoParts(line))

  const priority = getIndexOfLetter(commonLetter)

  //   console.log(commonLetter, priority, line, splitStringIntoTwoParts(line))

  totalSumOfPriorities += priority
})

console.log("ANSWER #1", totalSumOfPriorities)

const groupsOfThreeLines = []

for (let i = 0; i < lines.length; i += 3) {
  const chunk = lines.slice(i, i + 3)
  // do whatever
  groupsOfThreeLines.push(chunk)
}

totalSumOfPriorities = 0

groupsOfThreeLines.forEach((group) => {
  const commonLetter = findCommonLetterInThreeParts(group)

  const priority = getIndexOfLetter(commonLetter)

  //   console.log(commonLetter, priority, group)

  totalSumOfPriorities += priority
})

console.log("ANSWER #2", totalSumOfPriorities)
