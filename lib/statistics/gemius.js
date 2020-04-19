function extract (response, sites) {
  return response.data
    .filter(row => sites.includes(row.fullPathName))
    .map(site => ({
      name: site.fullPathName,
      visitors: site['7'].value
    }))
}

function getYesterday (DateParser) {
  return DateParser.format(DateParser.getYesterday(), 'YYYY-MM-DD')
}

module.exports = function (HTTPClient, DateParser) {
  return {
    scrape (sites, date = getYesterday(DateParser)) {
      return HTTPClient
        .fetch(`https://rating.gemius.com/hu/reports/segmentation/data/table?segmentationType=domains&treeId=547583&action=&selectedPeriod%5BstartDate%5D=${date}&selectedPeriod%5BendDate%5D=${date}&selectedPeriod%5BperiodUnit%5D=day&selectedPeriod%5BisForecast%5D=false&selectedPeriod%5BcalendarType%5D=days&selectedLocationId=1&selectedPlatformId=99&selectedMetrics%5B0%5D%5BID%5D=7&selectedMetrics%5B0%5D%5Bname%5D=Real%20users&selectedMetrics%5B0%5D%5Blabel%5D=Real%20users&selectedMetrics%5B0%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B0%5D%5Bformat%5D%5B%5D=integer&selectedMetrics%5B0%5D%5Bid%5D=7&selectedMetrics%5B1%5D%5BID%5D=110&selectedMetrics%5B1%5D%5Bname%5D=Reach-Internet&selectedMetrics%5B1%5D%5Blabel%5D=El%C3%A9r%C3%A9s%20-%20Internet&selectedMetrics%5B1%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B1%5D%5Bformat%5D%5B%5D=percentage&selectedMetrics%5B1%5D%5Bid%5D=110&selectedMetrics%5B2%5D%5BID%5D=8&selectedMetrics%5B2%5D%5Bname%5D=Page%20views&selectedMetrics%5B2%5D%5Blabel%5D=Oldallet%C3%B6lt%C3%A9sek&selectedMetrics%5B2%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B2%5D%5Bformat%5D%5B%5D=integer&selectedMetrics%5B2%5D%5Bid%5D=8&selectedMetrics%5B3%5D%5BID%5D=25&selectedMetrics%5B3%5D%5Bname%5D=Visits&selectedMetrics%5B3%5D%5Blabel%5D=L%C3%A1togat%C3%A1sok&selectedMetrics%5B3%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B3%5D%5Bformat%5D%5B%5D=integer&selectedMetrics%5B3%5D%5Bid%5D=25&selectedMetrics%5B4%5D%5BID%5D=11&selectedMetrics%5B4%5D%5Bname%5D=Time&selectedMetrics%5B4%5D%5Blabel%5D=Id%C5%91%20%5Bs%5D&selectedMetrics%5B4%5D%5Bformat%5D%5B%5D=&selectedMetrics%5B4%5D%5Bformat%5D%5B%5D=time&selectedMetrics%5B4%5D%5Bid%5D=11&selectedMetricId=&chartVisibility=true&currentLayout=layout_column`, false)
        .then(response => extract(response, sites))
    }
  }
}