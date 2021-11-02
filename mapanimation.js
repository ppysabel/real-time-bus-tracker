// This array contains the coordinates for all bus stops between MIT and Harvard
const busStops = [
    [-71.093729, 42.359244],
    [-71.094915, 42.360175],
    [-71.0958, 42.360698],
    [-71.099558, 42.362953],
    [-71.103476, 42.365248],
    [-71.106067, 42.366806],
    [-71.108717, 42.368355],
    [-71.110799, 42.369192],
    [-71.113095, 42.370218],
    [-71.115476, 42.372085],
    [-71.117585, 42.373016],
    [-71.118625, 42.374863],
];
  
async function run () {
    const locations = await getBusLocations();
  
    const input = prompt("Input bus number");
  
    for (let i = 0;i < 1000; i++){
   
        if(locations[i].attributes.Routes.includes(input)){
            busStops.push(locations[i].geometry.points[0]);
        }
    }   
    for (let i = 0;i < busStops.length; i++) {
     // console.log(busStops[i]);
    }
    move();
}
  
  
async function getBusLocations() {
    const url = "https://gis.vta.org/gis/rest/services/Transit/BusRoutes_StopsJanuary2020_ODP/MapServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"
    const response = await fetch(url);
    const json = await response.json();
  
    return json.features;
}

mapboxgl.accessToken = 'pk.eyJ1IjoicHB5c2FiZWwiLCJhIjoiY2t1enYyOWJmMDUwNDJxbXMzaGY3NnU4aCJ9.Rayxs6ikLg0TFbzvadRF8g';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 14,
});

let marker = new mapboxgl.Marker().setLngLat([-71.092761, 42.357575]).addTo(map);

let counter = 0;
  
function move() {
    setTimeout(() => {
        if(counter >= busStops.length) return;
        else {
          //console.log(busStops[counter]);
          marker.setLngLat(busStops[counter])
          .addTo(map);
          counter++;
          move();
        }
    }, 1500);
}
  
  
  
  // Do not edit code past this point
if (typeof module !== 'undefined') {
    module.exports = { move };
}