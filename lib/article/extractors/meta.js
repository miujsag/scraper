const metaSelectors = {
  title: "meta[property='og:title']",
  description: "meta[property='og:description']",
  image: "meta[property='og:image']",
  author: "meta[property='og:author']",
};

function getMeta(parser, document, selector) {
  return parser.getAttribute(parser.select(document, selector), "content");
}

function extract(HTMLParser, html) {
  const document = HTMLParser.parse(html);

  return {
    title: getMeta(HTMLParser, document, metaSelectors.title),
    description: getMeta(HTMLParser, document, metaSelectors.description),
    image: getMeta(HTMLParser, document, metaSelectors.image),
    author: getMeta(HTMLParser, document, metaSelectors.author),
  };
}

module.exports = {
  extract,
};
