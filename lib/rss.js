const Parser = require('rss-parser')
const parser = new Parser()

function scrape (url) {
  return parser
    .parseURL(url)
    .then(({items}) => items.map(extract))
}

function extract (item) {
  return {
    title: item.title,
    url: item.link,
    author: item.creator,
    description: item.content,
    publishedAt: item.isoDate || item.pubDate || item.pubdate,
    categoryCandidates: item.categories
  }
}

module.exports = {
  scrape
}
