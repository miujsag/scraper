function extract (HTMLParser, html) {
  const document = HTMLParser.parse(html)

  const allReferralsPercentage = HTMLParser.getText(HTMLParser.select(document, '.subheading-value.referrals'))

  const referrals = HTMLParser.map(document, '.websitePage-list li', function (index, element) {
    return {
      site: HTMLParser.getText(HTMLParser.getChild(document, element, '.websitePage-listItemLink')),
      percentage: HTMLParser.getText(HTMLParser.getChild(document,  element, '.websitePage-trafficShare'))
    }
  })

  return {
    referrals,
    all: allReferralsPercentage
  }
}

module.exports = function (HTTPClient, HTMLParser) {
  return {
    scrape (site) {
      return HTTPClient
        .fetch(`https://www.similarweb.com/website/${site}`)
        .then(html => extract(HTMLParser, html))
    }
  }
}