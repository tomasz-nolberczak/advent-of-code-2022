const fs = require("fs"),
  path = require("path")

export const getRelativeToUtilsFileLocation = (filePath: string) => {
  return path.join(__dirname, filePath)
}

export const readFileLineByLine = (filePath: string) => {
  return fs.readFileSync(filePath, "utf-8").split(/\r?\n/)
}
