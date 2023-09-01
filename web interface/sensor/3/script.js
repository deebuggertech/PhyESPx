/**** SENSOR SCRIPT ****/

/** General Variables**/
let sensorID = 3;
let sensorName = "Optical Stopwatch";

/** Global Export Configuration **/
function clearExportDataSet() {
  downloadData = "\"Not available for this sensor\" \r\n";
}

function appendDataToExportDataSet(data) {
  //nothing
}


/** GUI Structure **/
var views = [{
    "name": "Data",
    "elements": [
        {
            "index": "0",
            "html": "<div class=\"valueElement view0\" id=\"element0\"><span class=\"label\">State</span><span class=\"value\">idle</span></div>",
            "updateView": function(data) {
                var valueNumber = document.getElementById("element0").getElementsByClassName("value")[0];
                valueNumber.textContent = data.state;
            },
            "clearView": function() {
                var valueNumber = document.getElementById("element0").getElementsByClassName("value")[0];
                valueNumber.textContent = "idle";
            }
        },
        {
            "index": "1",
            "html": "<div class=\"valueElement view0\" id=\"element1\"><span class=\"label\">Duration</span><span class=\"value\">-</span><span class=\"unit\">ms</span></div>",
            "updateView": function(data) {
                var valueNumber = document.getElementById("element1").getElementsByClassName("value")[0];
                if(data.duration == 0){
                valueNumber.textContent = "-";
                }else{
                valueNumber.textContent = data.duration.toFixed(2);
                }
            },
            "clearView": function() {
                var valueNumber = document.getElementById("element1").getElementsByClassName("value")[0];
                valueNumber.textContent = "-";
            }
        },
    ]
},


{
    "name": "Processed",
    "elements": [
        {
            "index": "2",
            "html": "<div class=\"inputElement view1\" id=\"element2\"><span class=\"label\">Distance<sup>*</sup></span><input class=\"valueInput\"><span class=\"unit\">cm</span><p style=\"text-align: center; font-size: 80%; padding-top: 5px;\">*between light barriers</p></div>",
        },

        {
            "index": "3",
            "html": "<div class=\"valueElement view1\" id=\"element3\"><span class=\"label\">Velocity<sup>*</sup></span><span class=\"value\">-</span><span class=\"unit\"><sup>m</sup>/<sub>s</sub></span><p style=\"text-align: center; font-size: 80%; padding-top: 5px;\">*average</p></div>",
            "updateView": function(data) {
                var valueNumber = document.getElementById("element3").getElementsByClassName("value")[0];
                var inputValue = parseInt(document.getElementById("element2").getElementsByClassName("valueInput")[0].value);
                if(data.duration != 0 && !isNaN(inputValue)){
                valueNumber.textContent = ((inputValue/100)/(data.duration/1000)).toFixed(2);
                }else{
                valueNumber.textContent = "-";
                }
            },
            "clearView": function() {
                var valueNumber = document.getElementById("element3").getElementsByClassName("value")[0];
                valueNumber.textContent = "-";
            }
        },

        {
            "index": "4",
            "html": "<div class=\"valueElement view1\" id=\"element4\"><span class=\"label\">Velocity<sup>*</sup></span><span class=\"value\">-</span><span class=\"unit\"><sup>km</sup>/<sub>h</sub></span></span><p style=\"text-align: center; font-size: 80%; padding-top: 5px;\">*average</p></div>",
            "updateView": function(data) {
                var valueNumber = document.getElementById("element4").getElementsByClassName("value")[0];
                var inputValue = parseInt(document.getElementById("element2").getElementsByClassName("valueInput")[0].value);
                if(data.duration != 0 && !isNaN(inputValue)){
                valueNumber.textContent = (3.6*(inputValue/100)/(data.duration/1000)).toFixed(2);
                }else{
                valueNumber.textContent = "-";
                }
            },
            "clearView": function() {
                var valueNumber = document.getElementById("element4").getElementsByClassName("value")[0];
                valueNumber.textContent = "-";
            }
        },
    ]
},

{
    "name": "Information",
    "elements": [
        {
            "index": "5",
            "html": "<div class=\"textElement view2\" id=\"element5\"><span class=\"heading\">Optical Stopwatch</span>The optical stopwatch is based on two infrared light barriers, which are equipped with magnets for mounting on the underside and can be calibrated using a built-in potentiometer. An Arduino Nano measures the time interval between the activations in nanoseconds and forwards this information to the server-component.</div>"
        }
    ]
}

];