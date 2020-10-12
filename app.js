var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var updateLayerData = require('./services/updateLayerData');
var webscraper = require('./services/webscraper');
var cron = require('node-cron');

console.log('updating layers every 4 hours')
// running every 4 hours
updateLayerData();
cron.schedule('0 */4 * * *', () => {
  console.log('running cron job');
  updateLayerData();
});

var apiRouter = require('./api/apiRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'))

app.use('/api', apiRouter);

// catches bad URLs
app.use('*', express.static(path.join(__dirname, 'public/index.html')));

module.exports = app;
