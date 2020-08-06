$(document).ready(() => {
  require(["esri/Map", "esri/views/MapView", "esri/layers/KMLLayer", "esri/widgets/ScaleBar"], function (Map, MapView, KMLLayer, ScaleBar) {

    var layer = new KMLLayer({
      // major earthquakes for latest 30 days from USGS
      url: "https://earthquake.usgs.gov/fdsnws/event/1/query?format=kml&minmagnitude=5.8"
    });

    var map = new Map({
      basemap: "topo-vector",
      layers: [layer]
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.805, 34.027], // longitude, latitude
      zoom: 13
    });

    

    var scalebar = new ScaleBar({
      view: view
    });
    view.ui.add(scalebar, "bottom-left");
  });
})