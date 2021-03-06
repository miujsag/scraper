const path = require("path");
const filePath = path.join(__dirname, "scrape_article.py");

function extract(python, url) {
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

module.exports = {
  extract,
};
