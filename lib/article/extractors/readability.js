const read = require("node-readability");

function extract(HTMLParser, MetaExtractor, url) {
  return new Promise(function (resolve, reject) {
    read(url, function (error, article) {
      if (error) {
        reject(error);
      }

      const metaResults = MetaExtractor.extract(HTMLParser, article.html);

      resolve({
        ...metaResults,
        html: article.html,
        title: article.title || metaResults.title,
        content: article.content,
      });
    });
  });
}

module.exports = {
  extract,
};
