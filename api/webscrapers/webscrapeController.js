const axios = require('axios');
const cheerio = require('cheerio');

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
