function getReferences(html, selectors) {
  const $ = cheerio.load(html);

  if (selectors) {
    const content = $(selector);
  } else {
    return "lolgec";
  }

  const references = $("a");

  return references;
}

module.exports = function (HTTPClient, HTMLParser, Python) {
  return {
    get(url) {},
  };
};
