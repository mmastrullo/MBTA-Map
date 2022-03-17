mapboxgl.accessToken = 'pk.eyJ1IjoibXNtYXN0cnVsbG8iLCJhIjoiY2wwbXFucDA5MThvdDNibDRtMHdudmxmZCJ9.6LTm5cMRxkGwcUF0WetZlw';
	
const liveLocations = {};
async function run(){
    // get bus data    
    const locations = await getBusLocations();
    //printing time
    console.log(new Date());

    locations.forEach((bus)=>{
    //create markers for busLocations 
        liveLocations[bus.id] = new mapboxgl.Marker()
        .setLngLat([bus.attributes.longitude, bus.attributes.latitude])
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



//create map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081, 42.365554],
    zoom: 12,
});


//create bus stop markers
//bus stop long/lat
const busStops = [
        [-71.11747131545798, 42.37331828517878],
        [-71.0706715374352, 42.375753019917894],
        [-71.11159990011666, 42.373607501344395],
        [-71.10959815963471, 42.372763898584886],
        [-71.10607321232531, 42.371864648218036],
        [-71.10422911971496, 42.37091891981904],
        [-71.10229397184347, 42.370272315925],
        [-71.10029439087975, 42.36945707168718],
        [-71.09783255891156, 42.368659160351406],
        [-71.097071119715, 42.368145441938026],
        [-71.09424178300918, 42.36735064975497],
        [-71.09087674670299, 42.36556752163653],
        [-71.08926842654277, 42.3647031190312],
        [-71.08520800067906, 42.36266445646197]
];

// Add markers to the map.
busStops.forEach((element)=>{
    const stopMarker = new mapboxgl.Marker({color: 'black', rotation: 45, scale: 0.5})
    stopMarker.setLngLat(element).addTo(map);
})
