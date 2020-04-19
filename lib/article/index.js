const metaSelectors = {
  title: "meta[property='og:title']",
  description: "meta[property='og:description']",
  image: "meta[property='og:image']",
};

function getText(parser, document, selector) {
  return parser.getText(parser.select(document, selector));
}

function getMeta(parser, document, selector) {
  return parser.getAttribute(parser.select(document, selector), "content");
}

function extract(HTMLParser, html, selectors) {
  const { title, author, publishedAt, category, content } = selectors;
  const document = HTMLParser.parse(html);

  return {
    html,
    title:
      getText(HTMLParser, document, title) ||
      getMeta(HTMLParser, document, metaSelectors.title),
    description:
      getText(HTMLParser, document, `${content} p:first-of-type`) ||
      getMeta(HTMLParser, document, metaSelectors.description),
    image: getMeta(HTMLParser, document, metaSelectors.image),
    author: getText(HTMLParser, document, author),
    publishedAt: getText(HTMLParser, document, publishedAt),
    category: getText(HTMLParser, document, category),
    content: getText(HTMLParser, document, content),
  };
}

module.exports = function (HTTPClient, HTMLParser) {
  return {
    scrape(url, selectors) {
      return HTTPClient.fetch(url).then((html) =>
        extract(HTMLParser, html, selectors)
      );
    },
  };
};
