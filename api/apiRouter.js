const express = require('express');
const router = express.Router();
var webscrapeRouter = require('./webscrapers/webscrapeRouter');

router.use('/webscrape', webscrapeRouter);

module.exports = router;