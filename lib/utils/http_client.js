const detectEncoding = require("chardet");
const iconvLite = require("iconv-lite");

module.exports = function (client) {
  return {
    fetch(url, isHTML = true) {
      if (isHTML) {
        return client(url)
          .then((response) => response.buffer())
          .then(function (buffer) {
            const encoding = detectEncoding.detect(buffer);

            const decoded = iconvLite.decode(buffer, encoding);

            return decoded;
          });
      }

      return client(url).then((response) => response.json());
    },
  };
};
