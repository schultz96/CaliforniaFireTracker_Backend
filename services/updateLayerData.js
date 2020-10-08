const fs = require('fs');
const axios = require('axios');
const { update } = require('../db/models/overview');

const updateLayerData = () => {
    try {
        axios({
            method: 'get',
            url: 'https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson',
            responseType: 'stream'
        })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream('./public/data/wildfire.geojson'))
                console.log('Saved wildfire layer file.')
            });
    }
    catch (err) {
        console.log('ERROR fetching or writing latest wildfire layer data.');
        console.log(err)
    }

    try {
        axios({
            method: 'get',
            url: 'https://opendata.arcgis.com/datasets/68637d248eb24d0d853342cba02d4af7_0.geojson',
            responseType: 'stream'
        })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream('./public/data/incidents.geojson'))
                console.log('Saved incident layer file.')
            });
    }
    catch (err) {
        console.log('ERROR fetching or writing latest incident layer data.');
        console.log(err)
    }

    try {
        axios({
            method: 'get',
            // https://opendata.arcgis.com/datasets/68637d248eb24d0d853342cba02d4af7_0.geojson
            url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2',
            responseType: 'stream',
            params: {
                f: 'json',
                outFields: '*',
                returnIdsOnly: false,
                returnCountOnly: false
            }
        })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream('./public/data/response.json'))
                console.log('Saved response layer file.')
            });
    }
    catch (err) {
        console.log('ERROR fetching / writing latest response layer data.');
        console.log(err)
    }
}

module.exports = updateLayerData;