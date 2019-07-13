const fetch = require('node-fetch')
const cheerio = require('cheerio')

function scrape (bank) {
  return fetch(`http://api.napiarfolyam.hu/?bank=${bank}`)
    .then(response => response.text())
    .then(extract)
}

function extract (body) {
  const $ = cheerio.load(body)

  return $('arfolyamok deviza item').map(function (i, el) {
    return {
      currency: $(this).find('penznem').text(),
      value: $(this).find('kozep:first-of-type').text()
    }
  }).get()
}

module.exports = {
  scrape
}
