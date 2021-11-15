const textInput = document.querySelector('#ip');

let map = L.map("map", {
    center: [0, 0],
    zoom: 13,
    layers: [
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>contributors"
        }
        )
    ]
}).setView([51.505, -0.09], 2);

const markerIcon = L.icon({
    iconUrl: 'src/images/icon-location.svg',
    iconSize: [25, 35]
  });

//get the input from the text box
const load_map_resource = (lat, lng) => {
    map.setView([lat, lng], 2);
    L.marker([lat, lng], { icon: markerIcon }).addTo(map); 
    map.flyTo([lat, lng], 13);
}

// Consumindo API

        const searchIpAdress = document.querySelector('#search-ip-address')
        const searchIp = document.querySelector('#search-ip p');
        const searchLocation = document.querySelector('#search-location p');
        const searchUTC = document.querySelector('#search-utc p');
        const searchISP = document.querySelector('#search-isp p'); 
        const domainip = document.querySelector('#ip');       
        
        const getApiUrl =()=> {
            let url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_RTZXJXyyKGvKmcmPU1INU4Pj8bQlr&ipAddress=' + domainip.value
            return url;
        }
        
        // get ip address and show map information
        const getIpData = async ()=> {
            try {
                let request = await fetch(getApiUrl());
                let response = await request.json();
                const {ip, location : { city,lat, lng, timezone }, isp } = response;
                load_map_resource(lat, lng);
                searchIp.innerText = `${ip}`;
                searchLocation.innerText = `${city}`;
                searchUTC.innerText = `${timezone}`;
                searchISP.innerText = `${isp}`;
            } catch (error) {
                console.log(error);
                alert("Enter a valid domain name or ip address")
            }
        };

        searchIpAdress.addEventListener("submit", (e)=> {
            e.preventDefault();
            if(domainip.value == '' || domainip.value == null || domainip.value == undefined) {
                alert("Enter a valid domain name or ip address");
                return;
            }
            getIpData();
        });