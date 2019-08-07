const fetch = require('node-fetch')
const cheerio = require('cheerio')
const {createLogMessage} = require('logger')

function scrape (url, selectors) {
  return fetch(url)
    .then(response => response.text())
    .then(document => extract(document, selectors))
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
