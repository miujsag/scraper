const MetaExtractor = require("./extractors/meta");
const SelectorExtractor = require("./extractors/selectors");
const ReadabilityExtractor = require("./extractors/readability");

module.exports = function (HTTPClient, HTMLParser) {
  return {
    scrape(url, selectors, scrapingMethod = "selectors") {
      if (scrapingMethod === "selectors") {
        return HTTPClient.fetch(url).then((html) =>
          SelectorExtractor.extract(
            HTMLParser,
            MetaExtractor,
            html,
            selectors,
            url
          )
        );
      } else {
        return ReadabilityExtractor.extract(HTMLParser, MetaExtractor, url);
      }
    },
  };
};
