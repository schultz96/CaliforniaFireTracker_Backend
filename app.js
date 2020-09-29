var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var webscraper = require('./services/webscraper');


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
