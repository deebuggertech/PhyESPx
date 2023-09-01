let ws1;
let ws2;
let pingInterval;

var lastPong1Received = 0;
var lastPong2Received = 0;


var views = [{
    "name": "Data",
    "elements": [{
            "index": "0",
            "html": "<div style=\"font-size:120.0%;\" class=\"graphElement view0\" id=\"element0\"><span class=\"label\" onclick=\"toggleExclusive(0);\">UI-Diagram</span><div class=\"graph\"><canvas id=\"chart0\"></canvas></div></div>",
            "createView": function(data) {

                const valueXName = "Voltage";
                const valueXUnit = "V";
                const valueYName = "Current";
                const valueYUnit = "mA";

                var ctx = document.getElementById("chart0");
                var chart = new Chart(
                    ctx, {
                        type: 'scatter',
                        data: {
                            datasets: [{
                                borderColor: getComputedStyle(ctx).getPropertyValue("--color-primary"),
                                pointRadius: 4,
                                borderWidth: 3,
                                pointHitRadius: 4,
                                pointHoverRadius: 4,
                                tension: 0,
                                showLine: false,
                                spanGaps: true,
                                xAxisID: "xAxis",
                                yAxisID: "yAxis",
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            animation: false,
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    multiKeyBackground: "#ff7e22",
                                    displayColors: false,
                                    callbacks: {
                                        label: function(context) {
                                            var label = [];
                                            label.push(context.parsed.x.toFixed(1) + ' '+valueXUnit);
                                            label.push(context.parsed.y.toFixed(1) + ' '+valueYUnit);
                                            return label;
                                        },
                                        labelTextColor: function(context) {
                                            return getComputedStyle(ctx).getPropertyValue("--color-text");
                                        }
                                    }
                                }
                            },
                            interaction: {
                                mode: 'nearest',
                                intersect: true,
                            },
                            scales: {
                                xAxis: {
                                    type: 'linear',
                                    position: 'bottom',

                                    grid: {
                                        color: "#808080",
                                        zeroLineColor: "#808080",
                                    },
                                    title: {
                                        display: true,
                                        text: valueXName+' ('+valueXUnit+')',
                                        color: getComputedStyle(ctx).getPropertyValue("--color-text"),
                                        font: {
                                            size: 15
                                        }
                                    },
                                    ticks: {
                                        color: getComputedStyle(ctx).getPropertyValue("--color-text"),
                                        maxTicksLimit: 8,
                                        source: 'auto',
                                        autoSkip: true,
                                        includeBounds: true,
                                        callback: function(value, index, ticks) {
                                        if(index != (ticks.length-1)) return value.toFixed(1);
                                        return "";
                                        }
                                    },
                                    offsetAfterAutoskip: true,
                                    bounds: 'data'
                                },
                                yAxis: {
                                    type: 'linear',
                                    position: 'left',

                                    grid: {
                                        color: "#808080",
                                        zeroLineColor: "#808080",
                                    },
                                    title: {
                                        display: true,
                                        text: valueYName+' ('+valueYUnit+')',
                                        color: getComputedStyle(ctx).getPropertyValue("--color-text"),
                                        font: {
                                            size: 15
                                        }
                                    },
                                    ticks: {
                                        color: getComputedStyle(ctx).getPropertyValue("--color-text"),
                                        maxTicksLimit: 8,
                                    },
                                }
                            }
                        }
                    }
                );
            },
            "updateView": function(data) {

                if(data.current != null){
                lastCurrent = data.current;
                }

                if(data.voltage != null){
                var newData = {
                    x: data.voltage/1000,
                    y: lastCurrent
                };
                var chart = Chart.getChart('chart0');
                chart.data.datasets[0].data.push(newData);
                chart.update();
                }
                
            },
            "clearView": function() {
            var chart = Chart.getChart('chart0');
            chart.data.datasets[0].data = [];
            chart.update();
            }
        },

        {
            "index": "1",
            "html": "<div class=\"valueElement view0\" id=\"element1\"><span class=\"label\">Power</span><span class=\"value\"></span><span class=\"unit\">mW</span></div>",
            "updateView": function(data) {
                var valueNumber = document.getElementById("element1").getElementsByClassName("value")[0];

                if(data.current != null){
                lastCurrent = data.current;
                }

                if(data.voltage != null){
                valueNumber.textContent = (lastCurrent * data.voltage / 1000).toFixed(1);
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
     "name": "Raw",
     "elements": [
         {
                     "index": "2",
                     "html": "<div style=\"font-size:120.0%;\" class=\"graphElement view1\" id=\"element2\"><span class=\"label\" onclick=\"toggleExclusive(2);\">Raw Data</span><div class=\"graph\"><canvas id=\"chart2\"></canvas></div></div>",
                     "createView": function(data) {

                         const valueXName = "Time";
                         const valueXUnit = "s";

                         var ctx = document.getElementById("chart2");
                         var chart = new Chart(
                             ctx, {
                                 type: 'scatter',
                                 data: {
                                     datasets: [
                                     {
                                         label: 'Voltage (1V)',
                                         borderColor: getComputedStyle(ctx).getPropertyValue("--color-primary"),
                                         pointRadius: 0,
                                         borderWidth: 2,
                                         pointHitRadius: 6,
                                         pointHoverRadius: 4,
                                         tension: 0,
                                         showLine: true,
                                         spanGaps: true,
                                         xAxisID: "xAxis",
                                         yAxisID: "yAxis",
                                     },
                                     {
                                         label: 'Current (100 mA)',
                                         borderColor: "#DC143C",
                                         pointRadius: 0,
                                         borderWidth: 2,
                                         pointHitRadius: 6,
                                         pointHoverRadius: 4,
                                         tension: 0,
                                         showLine: true,
                                         spanGaps: true,
                                         xAxisID: "xAxis",
                                         yAxisID: "yAxis",
                                     }
                                     ]
                                 },
                                 options: {
                                     responsive: true,
                                     maintainAspectRatio: false,
                                     animation: false,
                                     plugins: {
                                         legend: {
                                             display: false,
                                         },
                                         tooltip: {
                                             multiKeyBackground: "#ff7e22",
                                             displayColors: false,
                                             callbacks: {
                                                 label: function(context) {
                                                     var label = [];
                                                     label.push('Feature not available in BETA!');
                                                     return label;
                                                 },
                                                 labelTextColor: function(context) {
                                                     return getComputedStyle(ctx).getPropertyValue("--color-text");
                                                 }
                                             }
                                         }
                                     },
                                     interaction: {
                                         mode: 'nearest',
                                         intersect: true,
                                     },
                                     scales: {
                                         xAxis: {
                                             type: 'linear',
                                             position: 'bottom',

                                             grid: {
                                                 color: "#808080",
                                                 zeroLineColor: "#808080",
                                             },
                                             title: {
                                                 display: true,
                                                 text: valueXName+' ('+valueXUnit+')',
                                                 color: getComputedStyle(ctx).getPropertyValue("--color-text"),
                                                 font: {
                                                     size: 15
                                                 }
                                             },
                                             ticks: {
                                                 color: getComputedStyle(ctx).getPropertyValue("--color-text"),
                                                 maxTicksLimit: 8,
                                                 source: 'auto',
                                                 autoSkip: true,
                                                 includeBounds: true,
                                                 callback: function(value, index, ticks) {
                                                 if(index != (ticks.length-1)) return value.toFixed(1);
                                                 return "";
                                                 }
                                             },
                                             offsetAfterAutoskip: true,
                                             bounds: 'data'
                                         },
                                         yAxis: {
                                             type: 'linear',
                                             position: 'left',

                                             grid: {
                                                 color: "#808080",
                                                 zeroLineColor: "#808080",
                                             },
                                             title: {
                                                 display: false,
                                             },
                                             ticks: {
                                                 color: getComputedStyle(ctx).getPropertyValue("--color-text"),
                                                 maxTicksLimit: 8,
                                             },
                                         }
                                     }
                                 }
                             }
                         );
                     },
                     "updateView": function(data) {
                        var chart = Chart.getChart('chart2');

                        if(data.current != null){
                             var newData = {
                                 x: data.time+0.001,
                                 y: data.current/100
                             };
                             chart.data.datasets[0].data.push(newData);
                         }

                        if(data.voltage != null){
                         var newData = {
                             x: data.time+0.001,
                             y: data.voltage/1000
                         };
                         chart.data.datasets[1].data.push(newData);
                         }

                         chart.update();
                     },
                     "clearView": function() {
                     var chart = Chart.getChart('chart2');

                     chart.data.datasets[0].data = [];
                     chart.data.datasets[1].data = [];
                     
                     chart.update();
                     }
                 },
     ]
 }

];


function clearExportDataSet() {
}

function exportData() {
    alert("Feature not available in BETA!");
}


var ws1connected = false;
var ws2connected = false;

var ready = false;

var lastCurrent = 0;

function startWSClient() {
    console.log("Connecting...");

    buttons.style.display = "none";
    errorNode.textContent = "Connecting...";
    errorNode.style.display = "block";

    startWS1();
    startWS2();

    setTimeout(function() {
        startPing();
    }, 2000);
}


function startWS1(){
    console.log("Connecting to WS1...");
    ws1 = new WebSocket(server1);

    ws1.onopen = function(evt) {
        console.log("WS1 Connected");
        ws1connected = true;
        if(ws2connected){
        buttons.style.display = "block";
        errorNode.textContent = "No error.";
        errorNode.style.display = "none";
        }
    };

    ws1.onclose = function(evt) {
        if (ws1.readyState == WebSocket.CLOSED) {
            console.log("WS1 Closed");
            ws1connected = false;
            startWS1();
        }
    };

    ws1.onmessage = function(evt) {
        if (evt.data == "pong") {
                console.log("WS1 Pong");
                lastPong1Received = performance.now();
        } else {
        onWSReceived(evt.data);
        }
    };

    lastPong1Received = performance.now();
}


function startWS2(){
    console.log("Connecting to WS2...");
    ws2 = new WebSocket(server2);

    ws2.onopen = function(evt) {
        console.log("WS2 Connected");
        ws2connected = true;
        if(ws1connected){
        buttons.style.display = "block";
        errorNode.textContent = "No error.";
        errorNode.style.display = "none";
        }
    };

    ws2.onclose = function(evt) {
        if (ws2.readyState == WebSocket.CLOSED) {
            console.log("WS2 Closed");
            ws2connected = false;
            startWS2();
        }
    };

    ws2.onmessage = function(evt) {
        if (evt.data == "pong") {
                console.log("WS2 Pong");
                lastPong2Received = performance.now();
        } else {
        onWSReceived(evt.data);
        }
    };

    lastPong2Received = performance.now();
}

function startPing() {
    clearInterval(pingInterval);
    pingInterval = setInterval(function() {
        sendWS("ping");
        if (performance.now() - lastPong1Received > 3500) {
            buttons.style.display = "none";
            errorNode.textContent = "Ping Timeout! Reconnecting...";
            errorNode.style.display = "block";
            //ws1.close();
            startWS1();
        }
        if (performance.now() - lastPong2Received > 3500) {
            buttons.style.display = "none";
            errorNode.textContent = "Ping Timeout! Reconnecting...";
            errorNode.style.display = "block";
            //ws2.close();
            startWS2();
        }
    }, 500);
}

function sendWS(text) {
    if (ws1.readyState == WebSocket.OPEN) {
        ws1.send(text);
    }
    if (ws2.readyState == WebSocket.OPEN) {
        ws2.send(text);
    }
}

function on_status_clear() { //if clear is received from the server
    on_status_pause();
    views.forEach(function(view) {
        view["elements"].forEach(function(ve) {
            if (ve.hasOwnProperty("clearView")) {
                ve["clearView"]();
            }
        });
    });
    clearExportDataSet();
}

function on_status_run() { //if run is received from the server
    header.classList.add("active");
    measuring = true;
}

function on_status_pause() { //if pause is received from the server
    header.classList.remove("active");
    measuring = false;
}

function onWSReceived(message) {
        const data = JSON.parse(message);
        if (data.status != null) {
            console.log("Status Received: " + data.status.toUpperCase());
            if (data.status == "clear") on_status_clear();
            if (data.status == "run") on_status_run();
            if (data.status == "pause") on_status_pause();
        } else {
            console.log(message);
            views.forEach(function(view) {
                view["elements"].forEach(function(ve) {
                    if (ve.hasOwnProperty("updateView")) {
                        ve["updateView"](data);
                    }
                });
            });
        }
}

function toggleMeasuring() { //if play pause button is pressed
    if (measuring) {
        sendWS("{\"set_status\":\"pause\"}");
    } else {
        sendWS("{\"set_status\":\"run\"}");
    }
}

function clearData() { //if clear button is pressed
    sendWS("{\"set_status\":\"clear\"}");
}