module.exports = function (parser) {
  return {
    parse (html) {
      return parser.load(html)
    },

    select (document, selector) {
      return document(selector)
    },

    getText (element) {
      return element.text()
    },

    getAttribute (element, name) {
      return element.attr(name)
    },

    map (document, selector, callback) {
      return document(selector)
        .map(callback)
        .get()
    },

    getChild (document, element, selector) {
      return document(element).find(selector)
    }
  }
}
