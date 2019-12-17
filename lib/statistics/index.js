const Gemius = require('./gemius')
const SimilarWeb = require('./similarweb')

module.exports = function (HTTPClient, HTMLParser) {
  return {
    Gemius: Gemius(HTTPClient),
    SimilarWeb: SimilarWeb(HTTPClient, HTMLParser)
  }
}
