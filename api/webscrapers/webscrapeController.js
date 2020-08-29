const axios = require('axios');
const cheerio = require('cheerio');
var db = require('../../db/db');

async function scrapeFireCAGov(req, res, next) {
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

  let overview = {
    acres: acres,
    incidents: incidents,
    fatalities: fatalities,
    structures: structures
  }

  // console.log(overview);
  return overview
}

  // setTimeout( async () => {
  //   let data = await db.getCollection('sample_airbnb');
  //   console.log(data);
  // }, 1000)

// setInterval(() => {
//   console.log('test')
//   let data = scrapeFireCAGov();
//   console.log(data);
// }, 3000)

module.exports = {
   async scrapeFireCAGov(req, res, next) {
    const html = await axios.get('https://www.fire.ca.gov/incidents');
    const $ = await cheerio.load(html.data);

    let acres = parseInt($('.icon-with-data').find('h4').first().text());
    let incidents = parseInt($('.icon-with-data').next().find('h4').first().text());
    let fatalities = parseInt($('.icon-with-data').next().next().find('h4').first().text());
    let structures = parseInt($('.icon-with-data').next().next().next().find('h4').first().text());

    let overview = {
      acres: acres,
      incidents: incidents,
      fatalities: fatalities,
      structures: structures
    }

    console.log(overview);
    res.status(200).json(overview);
  }

  // scrapeRealtor();
}
