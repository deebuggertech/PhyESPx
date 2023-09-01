/**** SENSOR SCRIPT ****/

/** General Variables**/
let sensorID = 4;
let sensorName = "Voltage Sensor";

/** Global Export Configuration **/
function clearExportDataSet() {
  downloadData = "\"Time (s)\"; \"Voltage (V)\" \r\n";
}

function appendDataToExportDataSet(data) {
  downloadData += (data.time+" ; "+data.voltage/1000+" \r\n").replaceAll(".", ",");
}


/** GUI Structure **/
var views = [{
    "name": "Data",
    "elements": [{
            "index": "0",
            "html": "<div style=\"font-size:120.0%;\" class=\"graphElement view0\" id=\"element0\"><span class=\"label\" onclick=\"toggleExclusive(0);\">Voltage</span><div class=\"graph\"><canvas id=\"chart0\"></canvas></div></div>",
            "createView": function(data) {

                const valueXName = "Time";
                const valueXUnit = "s";
                const valueYName = "Voltage";
                const valueYUnit = "V";

                var ctx = document.getElementById("chart0");
                var chart = new Chart(
                    ctx, {
                        type: 'scatter',
                        data: {
                            datasets: [{
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
                                            label.push(context.parsed.x.toFixed(2) + ' '+valueXUnit);
                                            label.push(context.parsed.y.toFixed(2) + ' '+valueYUnit);
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
                var newData = {
                    x: data.time+0.001,
                    y: data.voltage/1000
                };
                var chart = Chart.getChart('chart0');
                chart.data.datasets[0].data.push(newData);
                chart.update();
            },
            "clearView": function() {
            var chart = Chart.getChart('chart0');
            chart.data.datasets[0].data = [];
            chart.update();
            }
        },

        {
            "index": "1",
            "html": "<div class=\"valueElement view0\" id=\"element1\"><span class=\"label\">Voltage</span><span class=\"value\"></span><span class=\"unit\">V</span></div>",
            "updateView": function(data) {
                var valueNumber = document.getElementById("element1").getElementsByClassName("value")[0];
                valueNumber.textContent = (data.voltage/1000).toFixed(2);
            },
            "clearView": function() {
                var valueNumber = document.getElementById("element1").getElementsByClassName("value")[0];
                valueNumber.textContent = "-";
            }
        },
    ]
},


{
    "name": "Information",
    "elements": [
        {
            "index": "2",
            "html": "<div class=\"textElement view1\" id=\"element2\"><span class=\"heading\">Voltage Sensor</span>The voltage sensor is based on the ADS1115 by Texas Instruments which is designed to measure voltages of up to ±40V.<br> Sampling frequency: 10Hz</div>"
        }
    ]
}

];