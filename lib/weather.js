const fetch = require('node-fetch')

function scrape (city, key) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city}&units=metric&lang=hu&APPID=${key}`)
    .then(response => response.json())
    .then(extract)
}

function extract (body) {
  if (body.cod === 200) {
    return {
      currentTemperature: body['main']['temp'],
      description: body['weather'][0]['description'],
      icon: body['weather'][0]['icon']
    }
  } else {
    throw new Error(body.message)
  }
}

module.exports = {
  scrape
}
