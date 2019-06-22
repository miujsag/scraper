const fetch = require('node-fetch')
const cheerio = require('cheerio')

function scrape (url, selectors) {
  return fetch(url)
    .then(response => response.text())
    .then(document => extract(document, selectors))
    .catch(error => {
      throw new Error(`
operation: scrape,
url: ${url},
selectors: ${selectors.title},
message: ${error.message}
      `)
    })
}

function extract (document, {title, author, publishedAt, category, content}) {
  const $ = cheerio.load(document)

  return {
    title: $(title).text(),
    author: $(author).text(),
    publishedAt: $(publishedAt).text(),
    category: $(category).text(),
    content: $(content).text(),
    description: $(`${content} p:first-of-type`).text(),
    html: document
  }
}

module.exports = {
  scrape
}
