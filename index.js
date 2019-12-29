const fetch = require('node-fetch')
const cheerio = require('cheerio')
const Parser = require('rss-parser')
const parser = new Parser()
const {PythonShell} = require('python-shell')

const HTTPClient = require('./lib/utils/http_client')(fetch)
const HTMLParser = require('./lib/utils/html_parser')(cheerio)
const RSSParser = require('./lib/utils/rss_parser')(parser)
const Article = require('./lib/article')(PythonShell)
const RSS = require('./lib/rss')(RSSParser)
const Weather = require('./lib/weather')(HTTPClient)
const Rate = require('./lib/rate')(HTTPClient, HTMLParser)
const Statistics = require('./lib/statistics')(HTTPClient, HTMLParser)

module.exports = function () {
  return {
    RSS: RSS,
    Article: Article,
    Weather: Weather,
    Rate: Rate,
    Statistics: Statistics
  }
}

/* Article.scrape('https://444.hu/2019/11/30/kubatov-nem-szabad-hagyni-hogy-ujsagirok-ocsaroljak-a-nelkuledet')
  .then(console.log)
  .catch(console.log)
 */
