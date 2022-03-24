mapboxgl.accessToken = 'pk.eyJ1IjoibXNtYXN0cnVsbG8iLCJhIjoiY2wwbXFucDA5MThvdDNibDRtMHdudmxmZCJ9.6LTm5cMRxkGwcUF0WetZlw';
	
const liveLocations = {};
async function run(){
    console.log(new Date());
    // get bus data    
    const locations = await getBusLocations();
    //printing time
    locations.forEach((bus)=>{
        //create DOM element for marker
        const image = document.createElement('div');
        image.id = 'marker';
        //create the popup
        const popupText = 'Bus ID: ' + bus.id + '\nOccupancy Status: ' + bus.attributes.occupancy_status;
        const popup = new mapboxgl.Popup({offset: 25}).setText(popupText);
        //create markers and popup for busLocations 
        liveLocations[bus.id] = new mapboxgl.Marker(image)
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
        .setPopup(popup)
        .addTo(map);
        // timer
        setTimeout(run, 15000);
        });
    }
run();

// Request bus data from MBTA
async function getBusLocations(){
const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
const response = await fetch(url);
const json     = await response.json();
return json.data;
}



//create map center "Massachusetts Ave @ Beacon St", update style to light background
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-71.089510, 42.350860],
    zoom: 13,
});

//create bus stop markers
//bus stop long/lat
const busStops = [ {"stop_seq":1, "stop_name": "Nubian", "longitude": -71.083279, "latitude": 42.328839},
{"stop_seq":2, "stop_name": "Washington St Opp Ruggles St", "longitude": -71.082985, 
"latitude":42.331265},
{"stop_seq":3, "stop_name": "Washington St @ Melnea Cass Blvd", "longitude": -71.081060,
"latitude": 42.332850},
{"stop_seq":4, "stop_name": "Melnea Cass Blvd @ Harrison Ave", "longitude": -71.079330, 
"latitude":42.332080},
{"stop_seq":5, "stop_name": "Albany St Opp Randall St", "longitude": -71.077730,
"latitude": 42.330715},
{"stop_seq":6, "stop_name": "Massachusetts Ave @ Albany St", "longitude": -71.073510, 
"latitude": 42.333500},
{"stop_seq":7, "stop_name": "Massachusetts Ave @ Harrison Ave", "longitude": -71.075170, 
"latitude":42.334910},
{"stop_seq":8, "stop_name": "Massachusetts Ave @ Washington St", "longitude": -71.077050,
"latitude": 42.336490},
{"stop_seq":9, "stop_name": "Massachusetts Ave @ Tremont St", "longitude": -71.080320,
"latitude": 42.339310},
{"stop_seq":10, "stop_name": "Massachusetts Ave @ Massachusetts Ave Station", "longitude": -71.083276, 
"latitude":42.341595},
{"stop_seq":11, "stop_name": "Massachusetts Ave @ St Botolph St", "longitude": -71.084080, 
"latitude":42.342160},
{"stop_seq":12, "stop_name": "Massachusetts Ave @ Clearway St", "longitude": -71.086952,
"latitude": 42.345751},
{"stop_seq":13, "stop_name": "Massachusetts Ave @ Newbury St", "longitude": -71.088160, 
"latitude":42.348110},
{"stop_seq":14, "stop_name": "Massachusetts Ave @ Beacon St", "longitude": -71.089510, 
"latitude":42.350860},
{"stop_seq":15, "stop_name": "77 Massachusetts Ave", "longitude": -71.093033,
"latitude": 42.359196},
{"stop_seq":16, "stop_name": "Massachusetts Ave @ Albany St", "longitude": -71.095980, 
"latitude":42.360840},
{"stop_seq":17, "stop_name": "Massachusetts Ave @ Sidney St", "longitude": -71.099620, 
"latitude":42.362980},
{"stop_seq":18, "stop_name": "Massachusetts Ave @ Prospect St", "longitude": -71.103980, 
"latitude":42.365560},
{"stop_seq":19, "stop_name": "Massachusetts Ave @ Bigelow St", "longitude": -71.106350,
"latitude": 42.367000},
{"stop_seq":20, "stop_name": "Massachusetts Ave @ Hancock St", "longitude": -71.108770, 
"latitude":42.368380},
{"stop_seq":21, "stop_name": "Massachusetts Ave @ Dana St", "longitude": -71.110757, 
"latitude":42.369181},
{"stop_seq":22, "stop_name": "Massachusetts Ave @ Trowbridge St", "longitude": -71.112960, "latitude":42.370080},
{"stop_seq":23, "stop_name": "Massachusetts Ave @ Bow St", "longitude": -71.115580, 
"latitude":42.372230},
{"stop_seq":24, "stop_name": "Massachusetts Ave @ Holyoke St", "longitude": -71.117910,
"latitude": 42.373120}
]
// Add markers to the map
for (let i=0; i<busStops.length; i++){
    const busStop = document.createElement('div');
    busStop.id = 'stop';
    new mapboxgl.Marker(busStop)
    .setLngLat([busStops[i].longitude, busStops[i].latitude]).addTo(map);
}

