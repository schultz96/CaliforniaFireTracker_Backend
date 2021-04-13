const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const updateLayerData = require('./services/updateLayerData');
const webscraper = require('./services/webscraper');
const cron = require('node-cron');

console.log('updating layers every 4 hours')
// running every 4 hours
updateLayerData();
cron.schedule('0 */4 * * *', () => {
  console.log('running cron job');
  updateLayerData();
  webscraper();
});
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'))

// catches bad URLs
app.use('*', express.static(path.join(__dirname, 'public/index.html')));

module.exports = app;
