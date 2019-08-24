function extract (HTMLParser, xml) {
  const document = HTMLParser.parse(xml)

  return HTMLParser.map(document, 'arfolyamok deviza item', function (index, element) {
    return {
      currency: HTMLParser.getText(HTMLParser.getChild(document, element, 'penznem')),
      value: HTMLParser.getText(HTMLParser.getChild(document,  element, 'kozep:first-of-type'))
    }
  })
}

module.exports = function (HTTPClient, HTMLParser) {
  return {
    scrape (bank) {
      return HTTPClient
        .fetch(`http://api.napiarfolyam.hu/?bank=${bank}`)
        .then(xml => extract(HTMLParser, xml))
    }
  }
}
