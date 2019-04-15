const OTHER_FORMATS = "\r\n|\r"
const NEWLINE = "\n"
const CSV_DELIMITER = ','

export default {
  // Returns an object based with column names as keys
  formatToJSON(data) {
    var split = data.replace(OTHER_FORMATS, NEWLINE).split(NEWLINE).map(element => element.trim())
    var output = []

    var columns = split[0].split(CSV_DELIMITER)

    for (var i = 1; i < split.length; i++) {
      var current = split[i].split(CSV_DELIMITER)
      var row = {}
      for (var j = 0; j < current.length; j++) {
        row[columns[j]] = current[j]
      }
      output.push(row)
    }

    return output
  }
}
