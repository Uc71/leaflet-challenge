var myMap=L.map("mapid",{
    center:[44.967243,-103.771556],
    zoom:3
   });
var grayMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',{
    attribution:'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom:10,
    id:'mapbox/streets-v11',
    tileSize:512,
    zoomOffset:-1,
    accessToken:API_KEY
});
grayMap.addTo(myMap);
// var quakes=d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data){})
// for(var i=0;i<quakes.length;i++){
//     L.circle(quakes[i].location,{
//      fillOpacity:.75,
//      color:"white",
//      fillColor:"purple",
//      radius:markerSize(((quakes[i].mag)/Math.PI)**.5)
//      }).bindPopup("<h1>"+quakes[i].time +"</h1> <hr> <h3>Population: "+quakes[i].gap+"</h3>").addTo(myMap);
//     }
    //COPIED FROM EXERCISE 17.2.4
    // Grab data with d3
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",function(data){
    console.log(data)
    function styleI(feature){
        return {
          fillColor: getcolor(feature.geometry.coordinates[2]),
          "color": "black",
          "fillOpacity":.5,
          "opacity":1,
          "stroke":false,
          radius: getradius(feature.properties.mag)
        }
    };
    function getcolor(depth){
      switch(true){
        case depth > 90:
          return "#FF0101";
        case depth > 70:
          return "#D50000";
        case depth > 50:
          return "#B60000";
        case depth > 30:
          return "#8C0000";
        case depth > 10:
          return "#660000";
        default:
          return "000000";
      }
      };
    function getradius(mag){
      return 2*((mag/Math.PI)**.5);
    };

  //   var geojsonMarkerOptions = {
  //     radius: 8,
  //     fillColor: getcolor(feature.geometry.coordinates[2]),
  //     color: "#000",
  //     weight: 1,
  //     opacity: 1,
  //     fillOpacity: 0.8
  // };

    L.geoJSON(data, {
      style: styleI,
      pointToLayer: function(feature, latlng) {
        //geojsonMarkerOptions.fillColor(feature.geometry.coordinates[2])
        return L.circleMarker(latlng )
      }
  }).addTo(myMap);
    // geojson=L.circle(data,{
    //   // Define what  property in the features to use
    //   valueProperty:"geometry.coordinates",
    //   // Set color scale
    //   scale:["#ffffb2","#b10026"],
    //   // Number of breaks in step range
    //   steps:10,
    //   // q for quartile, e for equidistant, k for k-means
    //   //mode: "q",
    //   style: {
    //     // Border color
    //     color: "#fff",
    //   },
    //   // Binding a pop-up to each layer
    //   onEachFeature: function(feature,layer){
    //     layer.bindPopup("Zip Code: "+feature.properties.ZIP + "<br>Median Household Income:<br>"+
    //       "$"+feature.properties.MHI2016);
    //   }
    // }).addTo(myMap);
    // Set up the legend
    // var legend = L.control({ position: "bottomright" });
    // legend.onAdd = function() {
    //   var div = L.DomUtil.create("div", "info legend");
    //   var limits = geojson.options.limits;
    //   var colors = geojson.options.colors;
    //   var labels = [];
    //   // Add min & max
    //   var legendInfo = "<h1>Median Income</h1>" +
    //     "<div class=\"labels\">" +
    //       "<div class=\"min\">" + limits[0] + "</div>" +
    //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    //     "</div>";
    //   div.innerHTML = legendInfo;
    //   limits.forEach(function(limit, index) {
    //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    //   });
    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    //   return div;
    // };
    // // Adding legend to the map
    // legend.addTo(myMap);



    // a = ['red'. 'blue']
    // b = ['1-3', '3-5']
});