var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var updateLayerData = require('./services/updateLayerData');
var webscraper = require('./services/webscraper');
var cron = require('node-cron');

console.log('cron job scheduled for 4:00am')
// running every day at 4:00am
cron.schedule('5 * * * *', () => {
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
