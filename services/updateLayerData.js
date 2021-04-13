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
                response.data
                    .pipe(fs.createWriteStream('./public/data/wildfire.geojson'))
                    .on('close', () => {
                        console.log('Finished saving wildfire layer file.');
                    })
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
            response.data
                .pipe(fs.createWriteStream('./public/data/incidents.geojson'))
                .on('close', () => {
                    console.log('Finished saving incident layer file.');
                })
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
                response.data
                    .pipe(fs.createWriteStream('./public/data/response.geojson'))
                    .on('close', () => {
                        console.log('Finished saving response layer file.');
                    })
                
            });
    }
    catch (err) {
        console.log('ERROR fetching / writing latest response layer data.');
        console.log(err)
    }

    try {
        axios({
            method: 'get',
            url: 'https://opendata.arcgis.com/datasets/31219c833eb54598ba83d09fa0adb346_0.geojson',
            responseType: 'stream'
        })
        .then(function (response) {
            response.data
                .pipe(fs.createWriteStream('./public/data/hazard-areas.geojson'))
                .on('close', () => {
                    console.log('Finished saving hazard layer file.');
                    const hazardsJSON = JSON.parse(fs.readFileSync('./public/data/hazard-areas.geojson'));
                    
                    for (let i in hazardsJSON.features) {
                        if (hazardsJSON.features[i].properties.OBJECTID == null) {
                            hazardsJSON.features[i].properties.OBJECTID = Math.floor(Math.random() * 10000) + 1
                        }
                    }
                    
                    fs.writeFile('./public/data/hazard-areas.geojson', JSON.stringify(hazardsJSON), (err) => {
                        if (err) console.log(err);
                        console.log('wrote new hazards file with no null IDs');
                    });
                    
                })
        })
        // const hazardsJSON = JSON.parse(fs.readFileSync('./public/data/hazard-areas.geojson'));
        // for (let i in hazardsJSON) {
        //     if (hazardsJSON[i].OBJECTID == null) console.log('null objectid')
        // }
        // console.log(hazardsJSON);
    }
    catch (err) {
        console.log('ERROR fetching or writing latest hazard layer data.');
    }
}

module.exports = updateLayerData;