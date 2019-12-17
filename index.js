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

const {PythonShell} = require('python-shell')

function scrapeWithNewspaper (url) {
  const options = {
    args: [url]
  }

  return new Promise(function (resolve, reject) {
    PythonShell.run('newspaper_test.py', options, function (error, results) {
      if (error) {
        reject(error)
      }
  
      resolve(results)
    })
  })
}

scrapeWithNewspaper('https://444.hu/2019/11/30/kubatov-nem-szabad-hagyni-hogy-ujsagirok-ocsaroljak-a-nelkuledet')
  .then(data => data.join(''))
  .then(JSON.parse)
  .then(console.log)
  .catch(console.log)

/* scrapeWithNewspaper()
  .then(data => console.log(data.toString()))
  .catch(console.log)
 */
/* 
const {eachDayOfInterval, format} = require('date-fns')

const fs = require('fs')
const {promisify} = require('util')

const writeFile = promisify(fs.writeFile)
const sites = [
  {
    site: 'azonnali.hu',
    visitors: 23406,
    referralPercantage: 6.81,
    averageArticlePerDay: 9
  },
  {
    site: 'atlatszo.hu',
    visitors: 14778,
    referralPercantage: 19.73,
    averageArticlePerDay: 1
  },
  {
    site: 'alfahir.hu',
    visitors: 33001,
    referralPercantage: 1.13,
    averageArticlePerDay: 24
  },
  {
    site: 'index.hu',
    visitors: 826511,
    referralPercantage: '?',
    averageArticlePerDay: 114
  },
  {
    site: 'hvg.hu',
    visitors: 470286,
    referralPercantage: 4.8,
    averageArticlePerDay: 107
  },
  {
    site: 'origo.hu',
    visitors: 683677,
    referralPercantage: 23.94,
    averageArticlePerDay: 191
  },
  {
    site: 'nyugat.hu',
    visitors: 36742,
    referralPercantage: 4.48,
    averageArticlePerDay: 22
  },
  {
    site: 'nepszava.hu',
    visitors: 70150,
    referralPercantage: 14.68,
    averageArticlePerDay: '?'
  },
  {
    site: '24.hu',
    visitors: 761754,
    referralPercantage: 32.85,
    averageArticlePerDay: 130
  },
  {
    site: 'magyarnarancs.hu',
    visitors: 29744,
    referralPercantage: 11.07,
    averageArticlePerDay: 19
  },
  {
    site: '444.hu',
    visitors: 375680,
    referralPercantage: 4.91,
    averageArticlePerDay: 39
  }
]

const csv = sites.map(function (site) {
  return `${site.site}, ${site.visitors}, ${site.referralPercantage}, ${site.averageArticlePerDay}`
}).join('\n')

writeFile('sites.csv', csv, 'utf8')
  .then(() => console.log('finished'))
  .catch(console.log)
 */
/* Statistics.SimilarWeb.scrape('https://www.similarweb.com/website/origo.hu')
  .then(console.log)
  .catch(console.log)
 */
//  https://rating.gemius.com/hu/reports/segmentation/data/trendchart?treeId=547583&selectedPeriod%5BstartDate%5D=2019-10-01&selectedPeriod%5BendDate%5D=2019-10-01&selectedPeriod%5BperiodUnit%5D=day&selectedPeriod%5BisForecast%5D=false&selectedPeriod%5BcalendarType%5D=days&selectedLocationId=1&selectedPlatformId=99&selectedMetrics%5B0%5D%5BID%5D=7&selectedMetrics%5B0%5D%5Bname%5D=Real%20users&selectedMetrics%5B0%5D%5Blabel%5D=Real%20users&selectedMetrics%5B0%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B0%5D%5Bformat%5D%5B%5D=integer&selectedMetrics%5B0%5D%5Bid%5D=7&selectedMetrics%5B1%5D%5BID%5D=110&selectedMetrics%5B1%5D%5Bname%5D=Reach-Internet&selectedMetrics%5B1%5D%5Blabel%5D=El%C3%A9r%C3%A9s%20-%20Internet&selectedMetrics%5B1%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B1%5D%5Bformat%5D%5B%5D=percentage&selectedMetrics%5B1%5D%5Bid%5D=110&selectedMetrics%5B2%5D%5BID%5D=8&selectedMetrics%5B2%5D%5Bname%5D=Page%20views&selectedMetrics%5B2%5D%5Blabel%5D=Oldallet%C3%B6lt%C3%A9sek&selectedMetrics%5B2%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B2%5D%5Bformat%5D%5B%5D=integer&selectedMetrics%5B2%5D%5Bid%5D=8&selectedMetrics%5B3%5D%5BID%5D=25&selectedMetrics%5B3%5D%5Bname%5D=Visits&selectedMetrics%5B3%5D%5Blabel%5D=L%C3%A1togat%C3%A1sok&selectedMetrics%5B3%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B3%5D%5Bformat%5D%5B%5D=integer&selectedMetrics%5B3%5D%5Bid%5D=25&selectedMetrics%5B4%5D%5BID%5D=11&selectedMetrics%5B4%5D%5Bname%5D=Time&selectedMetrics%5B4%5D%5Blabel%5D=Id%C5%91%20%5Bs%5D&selectedMetrics%5B4%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B4%5D%5Bformat%5D%5B%5D=time&selectedMetrics%5B4%5D%5Bid%5D=11&selectedMetricId=7&chartVisibility=true&action=&chartUnit=day&chartMetricId=7&nodes%5B542753%5D%5Bname%5D=origo.hu&nodes%5B542753%5D%5BdomainPathName%5D=origo.hu&nodes%5B542753%5D%5BfullPathName%5D=origo.hu&nodes%5B542809%5D%5Bname%5D=blikk.hu&nodes%5B542809%5D%5BdomainPathName%5D=blikk.hu&nodes%5B542809%5D%5BfullPathName%5D=blikk.hu&nodes%5B543981%5D%5Bname%5D=24.hu&nodes%5B543981%5D%5BdomainPathName%5D=24.hu&nodes%5B543981%5D%5BfullPathName%5D=24.hu&nodes%5B547103%5D%5Bname%5D=index.hu&nodes%5B547103%5D%5BdomainPathName%5D=index.hu&nodes%5B547103%5D%5BfullPathName%5D=index.hu&nodes%5B547127%5D%5Bname%5D=nlc.hu&nodes%5B547127%5D%5BdomainPathName%5D=nlc.hu&nodes%5B547127%5D%5BfullPathName%5D=nlc.hu
