module.exports = function (client) {
  return {
    fetch (url, isHTML = true) {
      return client(url)
        .then(response => isHTML ? response.text() : response.json())
    }
  }
}
