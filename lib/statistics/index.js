const Gemius = require('./gemius')

module.exports = function (HTTPClient) {
  return {
    Gemius: Gemius(HTTPClient)
  }
}
