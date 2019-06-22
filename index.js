const rss = require('./lib/rss')
const article = require('./lib/article')
const weather = require('./lib/weather')
const rate = require('./lib/rate')

module.exports = {
  scrapeRSS: rss.scrape,
  scrapeArticle: article.scrape,
  scrapeWeather: weather.scrape,
  scrapeRate: rate.scrape
}
