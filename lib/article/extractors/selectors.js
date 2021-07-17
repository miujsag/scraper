const parseDatetime = require("../datetime_parser").parse;

function ensureAbsoluteURL(src, url) {
  if (!src) {
    return undefined;
  }

  const pattern = /^https?:\/\//i;

  if (pattern.test(src)) {
    return src;
  } else {
    return `${new URL(url).origin}/${src}`;
  }
}

function getText(parser, document, selector) {
  return parser.getText(parser.select(document, selector));
}

function extract(HTMLParser, MetaExtractor, html, selectors, url) {
  const { title, author, published_at, category, content } = selectors;
  const document = HTMLParser.parse(html);
  const metaResults = MetaExtractor.extract(HTMLParser, html);

  return {
    html,
    title: getText(HTMLParser, document, title) || metaResults.title,
    description:
      getText(HTMLParser, document, `${content} p:first-of-type`) ||
      metaResults.description,
    image: ensureAbsoluteURL(metaResults.image, url),
    author: getText(HTMLParser, document, author) || metaResults.author,
    published_at: parseDatetime(getText(HTMLParser, document, published_at)),
    category: getText(HTMLParser, document, category),
    content: getText(HTMLParser, document, content),
  };
}

module.exports = {
  extract,
};
