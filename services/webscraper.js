const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const Overview = require('../db/models/overview');

// temporary to test scraping
try {
  scrapeFireCAGov();
}
catch (err) {
  console.log(err);
}

// scrapes site every 4 hours
// setInterval(() => {
//   scrapeFireCAGov();
// }, 14400000)

async function scrapeFireCAGov() {
  const html = await axios.get('https://www.fire.ca.gov/incidents');
  const $ = await cheerio.load(html.data);

  let acres = $('.icon-with-data').find('h4').first().text();
  let incidents = $('.icon-with-data').next().find('h4').first().text();
  let fatalities = $('.icon-with-data').next().next().find('h4').first().text();
  let structures = $('.icon-with-data').next().next().next().find('h4').first().text();

  acres = acres.replace(/^(-)|[^0-9.,]+/g, '$1');
  incidents = incidents.replace(/^(-)|[^0-9.,]+/g, '$1');
  fatalities = fatalities.replace(/^(-)|[^0-9.,]+/g, '$1');
  structures = structures.replace(/^(-)|[^0-9.,]+/g, '$1');

  let statsOverview = await Overview.findOne({_id: '5f4c3f8326dce74e9c6cef12'})

  // setting to new values if they were scraped succesfully
  statsOverview.acres = acres ? acres : statsOverview.acres;
  statsOverview.incidents = incidents ? incidents: statsOverview.incidents;
  statsOverview.fatalities = fatalities ? fatalities: statsOverview.fatalities;
  statsOverview.structures = structures ? structures : statsOverview.structures;
  statsOverview.date = new Date();

  // console.log(statsOverview);

  // pushing to DB
  await statsOverview.save();

}


