import {
  getRelativeToUtilsFileLocation,
  readFileLineByLine,
} from "../_utils/files"

let totalScore = 0

const getPlayerOneMove = (line: string) => {
  return line.split(" ")[0]
}

const getPlayerTwoMove = (line: string) => {
  return line.split(" ")[1]
}

const lines = readFileLineByLine(
  getRelativeToUtilsFileLocation("../02/input.txt")
)

const matrix = [
  ["A", "B", "C"],
  ["X", "Y", "Z"],
]

const getPointForPlayerTwoMove = (playerTwoMove: "X" | "Y" | "Z") => {
  const index = matrix[1].indexOf(playerTwoMove)

  if (index < 0)
    throw new Error(`Cannot find the playerTwoMove: ${playerTwoMove}`)

  return index + 1
}

/**
 * A Kamień               index: 0
 *    Y Papier            index: 1    (wygrana)
 *    Z Nożyce            index: 2    (przegrana)
 *
 * B Papier               index: 1
 *    X Kamień            index: 0    (przegrana)
 *    Z Nożyce            index: 2    (wygrana)
 *
 * C Nożyce               index: 2
 *    X Kamień            index: 0    (wygrana)
 *    Y Papier            index: 1    (przegrana)
 *
 */
const getIndexOfWinningMove = (playerOneMove: "A" | "B" | "C") => {
  switch (playerOneMove) {
    case "A":
      return 1
    case "B":
      return 2
    case "C":
      return 0
  }
}

const getIndexOfDrawMove = (playerOneMove: "A" | "B" | "C") => {
  switch (playerOneMove) {
    case "A":
      return 0
    case "B":
      return 1
    case "C":
      return 2
  }
}

const getIndexOfLosingMove = (playerOneMove: "A" | "B" | "C") => {
  switch (playerOneMove) {
    case "A":
      return 2
    case "B":
      return 0
    case "C":
      return 1
  }
}

/**
 * A Kamień               index: 0
 *    Y Papier            index: 1    0 - 1 = -1  (wygrana)
 *    Z Nożyce            index: 2    0 - 2 = -2  (przegrana)
 *
 * B Papier               index: 1
 *    X Kamień            index: 0    1 - 0 = 1   (przegrana)
 *    Z Nożyce            index: 2    1 - 2 = -1  (wygrana)
 *
 * C Nożyce               index: 2
 *    X Kamień            index: 0    2 - 0 = 2   (wygrana)
 *    Y Papier            index: 1    2 - 1 = 1   (przegrana)
 *
 */
const guessTheResultOfGame = (
  playerOneMove: "A" | "B" | "C",
  playerTwoMove: "X" | "Y" | "Z"
) => {
  const indexOfFirstMove = matrix[0].indexOf(playerOneMove)
  const indexOfSecondMove = matrix[1].indexOf(playerTwoMove)

  // That means draw
  if (indexOfFirstMove === indexOfSecondMove) {
    return 3
  }

  switch (indexOfFirstMove - indexOfSecondMove) {
    case -1:
    case 2:
      return 6
    case 1:
    case -2:
      return 0
    default:
      throw new Error(
        `Wrong input. Passed ${indexOfFirstMove - indexOfSecondMove}`
      )
  }
}

lines.forEach(function (lineValue: string) {
  if (lineValue === "") return

  lineValue = lineValue.trim()

  const playerOneMove = getPlayerOneMove(lineValue)
  const playerTwoMove = getPlayerTwoMove(lineValue)

  let result = 0

  result += guessTheResultOfGame(
    playerOneMove as "A" | "B" | "C",
    playerTwoMove as "X" | "Y" | "Z"
  )

  result += getPointForPlayerTwoMove(playerTwoMove as "X" | "Y" | "Z")

  totalScore += result
})

console.log(`ANSWER #1 ${totalScore}`)

totalScore = 0

// Should be ANSWER #2 15508
lines.forEach(function (lineValue: string) {
  const playerOneMove = getPlayerOneMove(lineValue)
  const expectedResult = getPlayerTwoMove(lineValue)

  let result = 0

  /**
   * Rock       1
   * Paper      2
   * Scissors   3
   */

  switch (expectedResult) {
    case "X": // Assume Player#2 to lose
      result += 0
      result += getIndexOfLosingMove(playerOneMove as "A" | "B" | "C") + 1
      break
    case "Y": // Assume Player#2 to draw
      result += 3
      result += getIndexOfDrawMove(playerOneMove as "A" | "B" | "C") + 1
      break
    case "Z": // Assume Player#2 to win
      result += 6
      result += getIndexOfWinningMove(playerOneMove as "A" | "B" | "C") + 1
      break
  }

  totalScore += result
})

console.log(`ANSWER #2 ${totalScore}`)
