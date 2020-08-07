$(document).ready(() => {
  require(["esri/Map", "esri/views/MapView", "esri/layers/KMLLayer", "esri/layers/GeoJSONLayer", "esri/widgets/ScaleBar", "esri/layers/FeatureLayer"], function (Map, MapView, KMLLayer, GeoJSONLayer, ScaleBar, FeatureLayer) {

    // Active fires
    var geojsonLayer = new GeoJSONLayer({
      url: "https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson"
    });

    // Incidents
    var incidentLayer = new GeoJSONLayer({
      url: "https://opendata.arcgis.com/datasets/68637d248eb24d0d853342cba02d4af7_0.geojson",
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker",
          size: 5,
          color: "blue",
          outline: {
            width: 0.5,
            color: "black"
          }
        }
      }
    });

    // Responding locations
    var responseLayer = new FeatureLayer({
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2"
    });

    var map = new Map({
      basemap: "topo-vector",
      layers: [geojsonLayer, incidentLayer, responseLayer]
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-120.063339, 37.305869], // longitude, latitude 37.305869, -120.063339
      zoom: 7
    });

    var scalebar = new ScaleBar({
      view: view
    });

    view.ui.add(scalebar, "bottom-left");
  });
})