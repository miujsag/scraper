module.exports = function (parser) {
  return {
    parse (url) {
      return parser.parseURL(url)
    }
  }
}
