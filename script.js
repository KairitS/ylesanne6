(function() {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function() {

        var c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            var aeg = (h >= 12) ? " PM" : " AM"

            if (h > 12) {
                h = h - 12;
                if (h < 10) {
                    h = "0" + h;
                }
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + aeg;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    var e = document.getElementById("delivery");

    var hind = 0.00;

    function estimateDelivery(event) {

        hind = 0;

        event.preventDefault();

        var linn = document.getElementById("linn");
        var eesnimi = document.getElementById("fname");
        var perekonnanimi = document.getElementById("lname");

        if (eesnimi.value === "") {

                    alert("Palun sisestage eesnimi.");

                    fname.focus();

                    return;

                }

        if (perekonnanimi.value === "") {

                    alert("Palun sisestage perekonnanimi.");

                    lname.focus();

                    return;

                }

        const omniva = document.getElementById("Omniva").checked
        const itella = document.getElementById("Itella").checked
        const dpd = document.getElementById("DPD").checked

        if (!(omniva || itella || dpd)) alert("Palun valige sobivaim pakiautomaat.")

        if (document.getElementById("v1").checked) {
               hind += 5;
           }

           if (document.getElementById("v2").checked) {
               hind += 1;
           }

        if (linn.value === "") {

            alert("Palun valige linn nimekirjast.");

            linn.focus();

            return;


        } else {

          if (linn.value === "tln") {
                 hind += 0;
             } else if (linn.value === "trt") {
                 hind += 2.50;
             } else if (linn.value === "nrv") {
                 hind += 2.50;
             } else if (linn.value === "prn") {
                 hind += 3;
             }

        }

        e.innerHTML = hind + " &euro;";

        console.log("Tarne hind on arvutatud");
    }

})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {

    "use strict";

    var tartu = new Microsoft.Maps.Location(
            58.381065,
            26.7195
        );

    var narva = new Microsoft.Maps.Location(
            59.379137,
            28.199308
        );

    var centerpoint = new Microsoft.Maps.Location(
            58.851793,
            26.940269
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerpoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });

    var tartupushpin = new Microsoft.Maps.Pushpin(tartu, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    var narvapushpin = new Microsoft.Maps.Pushpin(narva, {
            title: 'Tartu Ülikooli Narva Kolledž',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    var infoboxtartu = new Microsoft.Maps.Infobox(tartu, {
        title: 'Tartu Ülikool',
        description: 'Tartu Ülikooli peahoone'
    });

    var infoboxnarva = new Microsoft.Maps.Infobox(narva, {
        title: 'Tartu Ülikooli Narva Kolledž',
        description: 'Tartu Ülikooli koosseisu kuuluv kõrgkool'
    });

    Microsoft.Maps.Events.addHandler(tartupushpin, 'click', function () { infoboxtartu.setMap(map); });
    Microsoft.Maps.Events.addHandler(narvapushpin, 'click', function () { infoboxnarva.setMap(map); });

    map.entities.push(tartupushpin)
    map.entities.push(narvapushpin);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
