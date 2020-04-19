const Gemius = require('./gemius')
const SimilarWeb = require('./similarweb')

module.exports = function (HTTPClient, HTMLParser, DateParser) {
  return {
    Gemius: Gemius(HTTPClient, DateParser),
    SimilarWeb: SimilarWeb(HTTPClient, HTMLParser)
  }
}
