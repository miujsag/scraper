const fetch = require('node-fetch')
const cheerio = require('cheerio')
const Parser = require('rss-parser')
const parser = new Parser()

const HTTPClient = require('./lib/utils/http_client')(fetch)
const HTMLParser = require('./lib/utils/html_parser')(cheerio)
const RSSParser = require('./lib/utils/rss_parser')(parser)
const Article = require('./lib/article')(HTTPClient, HTMLParser)
const RSS = require('./lib/rss')(RSSParser)
const Weather = require('./lib/weather')(HTTPClient)
const Rate = require('./lib/rate')(HTTPClient, HTMLParser)
const Statistics = require('./lib/statistics')(HTTPClient)

module.exports = function () {
  return {
    RSS: RSS,
    Article: Article,
    Weather: Weather,
    Rate: Rate,
    Statistics: Statistics
  }
}

/* Statistics.Gemius.scrape('https://rating.gemius.com/hu/reports/segmentation/data/table?&&selectedMetrics%5B0%5D%5Bformat%5D%5B%5D=integer&selectedPeriod%5BstartDate%5D=', ['index.hu', 'origo.hu'])
  .then(console.log)
  .catch(console.log) */
