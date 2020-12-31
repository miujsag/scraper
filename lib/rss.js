const Parser = require('rss-parser')
const parser = new Parser()

function extract (item) {
  return {
    title: item.title,
    url: item.link,
    author: item.creator,
    description: item.content,
    published_at: parseDate(item.pubDate),
    categoryCandidates: item.categories
  }
}

function isValidDate (date) {
  return date instanceof Date && !isNaN(date)
}

function normalizeTimeZone (date) {
  return new Date(date.replace('Europe/Budapest', '+0200'))
}

function parseDate (article) {
  const candidate = article.isoDate || article.pubDate || article.pubdate

  if (!candidate) return candidate

  return isValidDate(candidate) ? candidate : normalizeTimeZone(candidate)
}

module.exports = function (RSSParser) {
  return {
    scrape (url) {
      return RSSParser
        .parse(url)
        .then(({items}) => items.map(extract))
    }
  }
}
