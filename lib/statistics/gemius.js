function extract (response, sites) {
  return response.data
    .filter(row => sites.includes(row.fullPathName))
    .map(site => ({
      name: site.fullPathName,
      visitors: site['7'].value
    }))
}

module.exports = function (HTTPClient) {
  return {
    scrape (url, sites) {
      return HTTPClient
        .fetch(url, false)
        .then(response => extract(response, sites))
    }
  }
}