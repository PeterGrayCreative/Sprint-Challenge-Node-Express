const fetch = require('node-fetch');
const config = require('../../config.js');

const URI_YESTERDAY = config.URIs.yesterday;
const URI_CURRENT = config.URIs.current;

// Needs to stay in this specific order
const URI_ARRAY = [URI_YESTERDAY, URI_CURRENT];

function getPrices() {
  return new Promise((resolve, reject) => {
    //Maps over different API URLs and puts request response objects into an array of objects
    const promises = URI_ARRAY.map((uri) => {
      return fetch(uri)
        .then((res) => res.json())
        .then((res) => res.bpi);
    });
    Promise.all(promises)
      .then((priceObj) => resolve(priceObj))
      .catch((err) => reject(err));
  }).catch((err) => reject(err));
}

function getDifference(prices) {
  const yesterday = () => {
    const thePrice = prices[0];
    return thePrice[Object.keys(thePrice)[0]];
  };
  const todayPrice = () => {
    const thePriceObj = prices[1];
    const thePrice = thePriceObj.USD.rate_float;
    return thePrice;
  };
  return Math.round((todayPrice() - yesterday()) * 100 ) / 100;
}
module.exports = {
  getPrices,
  getDifference,
};
