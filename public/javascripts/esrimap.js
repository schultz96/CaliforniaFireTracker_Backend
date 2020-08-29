$(document).ready(() => {
  require(["esri/Map", "esri/views/SceneView", "esri/layers/KMLLayer", "esri/layers/GeoJSONLayer", "esri/widgets/ScaleBar", "esri/layers/FeatureLayer", "esri/layers/support/LabelClass"], function (Map, SceneView, KMLLayer, GeoJSONLayer, ScaleBar, FeatureLayer, LabelClass) {

    // Active fires
    var fireLayer = new GeoJSONLayer({
      // url: "https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson"
      url: "data/wildfire.geojson",
      id: 'fire',
      opacity: 0.55,
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-fill",
          color: "red"
        }
      }
    });

    const fireLabelClass = { // autocasts as new LabelClass()
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        color: "green",
        haloColor: "black",
        haloSize: '2px',
        font: { // autocast as new Font()
          family: "playfair-display",
          size: 10,
          weight: "bold"
        }
      },
      labelPlacement: "above-center",
      labelExpressionInfo: {
        expression: "$feature.IncidentName"
      }
    };

    // adds fire names to fireLayer
    fireLayer.labelingInfo = [fireLabelClass];

    // Incidents
    var incidentLayer = new GeoJSONLayer({
      // url: "https://opendata.arcgis.com/datasets/68637d248eb24d0d853342cba02d4af7_0.geojson"
      url: "data/incidents.geojson",
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker",
          size: 6,
          color: "yellow",
          outline: {
            width: 0.4,
            color: "black"
          }
        }
      }
    });

    const incidentLabelClass = { // autocasts as new LabelClass()
      symbol: {
        type: "text", // autocasts as new TextSymbol()
        color: "yellow",
        haloColor: "black",
        haloSize: '1px',
        font: { // autocast as new Font()
          family: "playfair-display",
          size: 8,
          weight: "bold"
        }
      },
      labelPlacement: "above-center",
      labelExpressionInfo: {
        expression: "$feature.IncidentName"
      }
    };

    incidentLayer.labelingInfo = [incidentLabelClass];

    // Responding locations
    var responseLayer = new FeatureLayer({
      url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/2",
      opacity: 0.4,
    });

    var smokeLayer = new FeatureLayer({
      url: "data/hms_smoke20200820.zip"
    })

    var map = new Map({
      basemap: "topo-vector",
      layers: [fireLayer, incidentLayer, responseLayer, smokeLayer]
    });

    var view = new SceneView({
      container: "viewDiv",
      map: map,
      center: [-120.063339, 37.305869], // longitude, latitude 37.305869, -120.063339
      zoom: 7
    });

    var scalebar = new ScaleBar({
      view: view
    });

    view.ui.add(scalebar, "bottom-left");

    $('#fireLayerCheck').on('change', function () {
      fireLayer.visible = !fireLayer.visible;
    });
    $('#incidentLayerCheck').on('change', function () {
      incidentLayer.visible = !incidentLayer.visible;
    });
    $('#responseLayerCheck').on('change', function () {
      responseLayer.visible = !responseLayer.visible;
    });
    
  });

  $('.twitter-box').on('click', function() {
    $(this).css('width', '0px');
  })

})