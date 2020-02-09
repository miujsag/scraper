function getText (parser, document, selector) {
  return parser.getText(parser.select(document, selector))
}

function extract (HTMLParser, html, selectors) {
  const { title, author, publishedAt, category, content } = selectors
  const document = HTMLParser.parse(html)

  return {
    html,
    title: getText(HTMLParser, document, title),
    author: getText(HTMLParser, document, author),
    publishedAt: getText(HTMLParser, document, publishedAt),
    category: getText(HTMLParser, document, content),
    description: getText(HTMLParser, document, `${content} p:first-of-type`),
  }
}

module.exports = function (HTTPClient, HTMLParser) {
  return {
    scrape (url, selectors) {
      return HTTPClient
        .fetch(url)
        .then(html => extract(HTMLParser, html, selectors))
    }
  }
}