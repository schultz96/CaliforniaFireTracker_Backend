var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var apiRouter = require('./api/apiRouter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
app.use(express.static(__dirname + '/public'))

app.use('/api', apiRouter);

module.exports = app;
