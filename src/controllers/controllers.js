const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const { getPrices, getDifference } = require('../models/models.js');

router.get('/compare', (req, res) => {
  getPrices()
    .then(getDifference)
    .then(priceDiff => {
      res.status(STATUS_SUCCESS);
      res.send({
          priceDifference: `The difference since yesterday is: ${priceDiff}`
      });
    })
    .catch((err) => {
      err: err;
    });
});

module.exports = router;
