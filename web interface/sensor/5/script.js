/**** SENSOR SCRIPT ****/

/** General Variables**/
let sensorID = 5;
let sensorName = "Distance Sensor";

/** Global Export Configuration **/
function clearExportDataSet() {
  downloadData = "\"Time (s)\"; \"Distance (cm)\" \r\n";
}

function appendDataToExportDataSet(data) {
  downloadData += (data.time+" ; "+data.distance+" \r\n").replaceAll(".", ",");
}


/** GUI Structure **/
var views = [
{
    "name": "Data",
    "elements": [{
            "index": "0",
            "html": "<div style=\"font-size:120.0%;\" class=\"graphElement view0\" id=\"element0\"><span class=\"label\" onclick=\"toggleExclusive(0);\">Distance</span><div class=\"graph\"><canvas id=\"chart0\"></canvas></div></div>",
            "createView": function(data) {

                const valueXName = "Time";
                const valueXUnit = "s";
                const valueYName = "Distance";
                const valueYUnit = "cm";

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
                    y: data.distance/10
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
            "html": "<div class=\"valueElement view0\" id=\"element1\"><span class=\"label\">Distance</span><span class=\"value\"></span><span class=\"unit\">cm</span></div>",
            "updateView": function(data) {
                var valueNumber = document.getElementById("element1").getElementsByClassName("value")[0];
                valueNumber.textContent = data.distance/10;
            },
            "clearView": function() {
                var valueNumber = document.getElementById("element1").getElementsByClassName("value")[0];
                valueNumber.textContent = "-";
            }
        },
    ]
},


{
     "name": "Procesed",
     "elements": [{
                 "index": "2",
                 "html": "<div style=\"font-size:120.0%;\" class=\"graphElement view1\" id=\"element2\"><span class=\"label\" onclick=\"toggleExclusive(2);\">Distance</span><div class=\"graph\"><canvas id=\"chart2\"></canvas></div></div>",
                 "createView": function(data) {

                     const valueXName = "Time";
                     const valueXUnit = "s";
                     const valueYName = "Distance";
                     const valueYUnit = "cm";

                     var ctx = document.getElementById("chart2");
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
                         y: data.distance/10
                     };
                     var chart = Chart.getChart('chart2');
                     chart.data.datasets[0].data.push(newData);
                     chart.update();
                 },
                 "clearView": function() {
                 var chart = Chart.getChart('chart2');
                 chart.data.datasets[0].data = [];
                 chart.update();
                 }
             },

            {
            "index": "3",
            "html": "<div style=\"font-size:120.0%;\" class=\"graphElement view1\" id=\"element3\"><span class=\"label\" onclick=\"toggleExclusive(3);\">Velocity</span><div class=\"graph\"><canvas id=\"chart3\"></canvas></div></div>",
            "createView": function(data) {

                const valueXName = "Time";
                const valueXUnit = "s";
                const valueYName = "Velocity";
                const valueYUnit = "m/s";

                var ctx = document.getElementById("chart3");
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
                if(lastDistanceData.distance != 0){ //if this method is called for the first time
                    var velocity = 0.001*(lastDistanceData.distance-data.distance)/(lastDistanceData.time - data.time);
                    velocity = (velocity + lastVelocityData.velocity)/2;
                    //velocity = velocity * ((-1.0)/(5*velocity+1.0)+1.0);
                    lastVelocityData.velocity = velocity;
                    var newData = {
                        x: data.time+0.001,
                        y: velocity.toFixed(1)
                    };
                    var chart = Chart.getChart('chart3');
                    chart.data.datasets[0].data.push(newData);
                    chart.update();
                    }
                lastDistanceData.time = data.time;
                lastDistanceData.distance = data.distance;
            },
            "clearView": function() {
            var chart = Chart.getChart('chart3');
            chart.data.datasets[0].data = [];
            chart.update();
            }
        }
     ]
},

{
     "name": "Information",
     "elements": [
         {
             "index": "4",
             "html": "<div class=\"textElement view2\" id=\"element4\"><span class=\"heading\">Distance Sensor Sensor</span>This Sensor is based on the VL53L0X laser-based time-of-flight (TOF) sensor and can measure distances from 5 cm to 100 cm.<br> Sampling frequency: 40Hz</div>"
         },
     ]
 }

];


var lastDistanceData = {time: 0,distance: 0};
var lastVelocityData = {velocity: 0};