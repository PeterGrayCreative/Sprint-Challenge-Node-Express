const fetch = require('node-fetch');
const config = require('../../config.js');

const URI_YESTERDAY = config.URIs.yesterday;
const URI_CURRENT = config.URIs.current;

const URI_ARRAY = [URI_YESTERDAY, URI_CURRENT];

function getPrices() {
  return new Promise((resolve, reject) => {
    const promises = URI_ARRAY.map((uri) => {
      fetch(uri)
        .then((res) => res.json)
        .then((res) => console.log(res));
    });
    Promise.all(promises)
      .then((priceObj) => console.log(priceObj))
      .catch((err) => reject(err));
  }).catch((err) => reject(err));
}

module.exports = {
  getPrices,
};
