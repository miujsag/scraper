const path = require("path");
const filePath = path.join(__dirname, "scrape_article.py");

function scrapeWithNewspaper(python, url) {
  const options = {
    args: [url],
  };

  return new Promise(function (resolve, reject) {
    python.run(filePath, options, function (error, results) {
      if (error) {
        reject(error);
      }

      resolve(results);
    });
  });
}

const metaSelectors = {
  title: "meta[property='og:title']",
  description: "meta[property='og:description']",
  image: "meta[property='og:image']",
  author: "meta[property='og:author']",
};

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

function getMeta(parser, document, selector) {
  return parser.getAttribute(parser.select(document, selector), "content");
}

function extract(HTMLParser, html, selectors, url) {
  const { title, author, published_at, category, content } = selectors;
  const document = HTMLParser.parse(html);

  return {
    html,
    title:
      getText(HTMLParser, document, title) ||
      getMeta(HTMLParser, document, metaSelectors.title),
    description:
      getText(HTMLParser, document, `${content} p:first-of-type`) ||
      getMeta(HTMLParser, document, metaSelectors.description),
    image: ensureAbsoluteURL(
      getMeta(HTMLParser, document, metaSelectors.image),
      url
    ),
    author: getText(HTMLParser, document, author),
    published_at: getText(HTMLParser, document, published_at),
    category: getText(HTMLParser, document, category),
    content: getText(HTMLParser, document, content),
  };
}

module.exports = function (HTTPClient, HTMLParser, Python) {
  return {
    scrape(url, selectors) {
      if (selectors) {
        return HTTPClient.fetch(url).then((html) =>
          extract(HTMLParser, html, selectors, url)
        );
      } else {
        return scrapeWithNewspaper(Python, url)
          .then((data) => data.join(""))
          .then(JSON.parse);
      }
    },
  };
};
