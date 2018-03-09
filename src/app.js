const express = require('express');
const config = require('../config.js');
const bTRoute = require('./controllers/controllers.js');

const app = express();
const PORT = config.port;

app.use(bTRoute);

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});
