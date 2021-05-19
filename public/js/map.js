let color;
function updateMap() {
    fetch("https://corona-api.com/countries")
    .then((response) => response.json())
    .then((number) => {
        number.data.forEach(element => {
            //console.log(element.latest_data.confirmed);
            cases = element.latest_data.confirmed;
            if(cases>200){
                color = "rgb(255,0,0)" ;
               // console.log("a");
              }
              
              else{
                color = `rgb(0,200,200)`;
               // console.log(cases);
              }
           //   if(cases<20000 && cases>15000){
           //    color = "rgb(200,56,56)" ;
           // console.log("b");
          //}
           // if(cases<15000 && cases>10000){
         //       color = "rgb(150,80,80)" ;
        //        console.log("c");
        //    }
        //    if(cases<10000 && cases>50000){
       //         color = "rgb(100,110,110)" ;
       //     }
       //     if(cases<50000 && cases>25000){
         //       color = "rgb(50,160,160)" ;
        //    }
        })
    })
//console.log(arr);

    fetch("https://corona-api.com/countries")
    .then((response1) => response1.json()
    )
    .then((rsp) => {
        rsp.data.forEach(element => {
            // console.log(element.coordinates.latitude);
                let lat = element.coordinates.latitude;
                let lon = element.coordinates.longitude;
                
                new mapboxgl.Marker({
                    color: `rgb(150,0,0)`
                })
                    .setLngLat([lon, lat])
                    .addTo(map);

            });
    })
}

updateMap();
setInterval(updateMap,30000);


function updateMap1() {
    fetch("https://api.covid19india.org/data.json")
    .then((response) => response.json())
    .then((number) => {
       // console.log(number);
        number.statewise.forEach(element => {
            cases = element.active;
            if(cases>200){
                color = "rgb(255,0,0)" ;
               // console.log("a");
              }
              
              else{
                color = `rgb(0,200,200)`;
               // console.log(cases);
              }
           //   if(cases<20000 && cases>15000){
           //    color = "rgb(200,56,56)" ;
           // console.log("b");
          //}
           // if(cases<15000 && cases>10000){
         //       color = "rgb(150,80,80)" ;
        //        console.log("c");
        //    }
        //    if(cases<10000 && cases>50000){
       //         color = "rgb(100,110,110)" ;
       //     }
       //     if(cases<50000 && cases>25000){
         //       color = "rgb(50,160,160)" ;
        //    }
        })
    })
//console.log(arr);

    fetch("map.json")
    .then((response1) => response1.json()
    )
    .then((rsp) => {
        //console.log(rsp);
        rsp.data.forEach(element => {
                let lat = element.lat;
                let lon = element.lon;
                
                new mapboxgl.Marker({
                    color: "red"
                })
                    .setLngLat([lon, lat])
                    .addTo(map);

            });
    })
}

updateMap1();
setInterval(updateMap,30000);