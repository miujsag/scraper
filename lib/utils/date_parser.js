module.exports = function (parser) {
  return {
    format (date, format) {
      return parser.format(date, format)
    },

    getYesterday () {
      return parser.subDays(new Date(), 1)
    }
  }
}