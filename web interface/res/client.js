let websocket;
let pingInterval;

var lastPongReceived = 0;

var downloadData = "";

/* Actions For Buttons */

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

function exportData() { //if export button is pressed
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(downloadData));
    element.setAttribute('download', 'Experiment Data.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}



/* Actions For Changes Of State */

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




/* WebSocket Communication */

function startWSClient() {
    buttons.style.display = "none";
    websocket = new WebSocket(serverIP);
    console.log("Connecting...");
    websocket.onopen = function(evt) {
        console.log("Connected!");
        buttons.style.display = "block";
        errorNode.textContent = "No error.";
        errorNode.style.display = "none";
        startPing();
    };
    websocket.onclose = function(evt) {
        if (websocket.readyState == WebSocket.CLOSED) {
            console.log("Error (disconnect)");
            restartConnection();
        }
    };
    websocket.onmessage = function(evt) {
        onWSReceived(evt.data);
    };

    window.onkeydown = function (e) {
        if((e.keyCode == 13 || e.keyCode == 32) && websocket.readyState == websocket.OPEN){ //shift or enter
          toggleMeasuring();
          e.preventDefault();
        } else if(e.keyCode == 46 ){ //delete
          clearData();
          e.preventDefault();
        } else if(e.keyCode == 83 && e.ctrlKey){//control s
          exportData();
          e.preventDefault();
        }
    };
}

function sendWS(text) {
    if (websocket.readyState == websocket.OPEN) {
	console.log(text);
        websocket.send(text);
    }
}

function startPing() {
    clearInterval(pingInterval);
    lastPongReceived = performance.now();
    pingInterval = setInterval(function() {
        sendWS("ping");
        if (performance.now() - lastPongReceived > 2500) {
            console.log("Error (ping)");
            restartConnection();
        }
    }, 500);
}

function onWSReceived(message) {
    if (message == "pong") {
        console.log("Pong received");
        lastPongReceived = performance.now();
    } else {
	//console.log(message);
        const data = JSON.parse(message);
        if (data.status != null) {
            console.log("Status received: " + data.status.toUpperCase());
            if (data.status == "clear") on_status_clear();
            if (data.status == "run") on_status_run();
            if (data.status == "pause") on_status_pause();
        }else if (data.sensorID != null) {
            if (data.sensorID != sensorID){
                if (confirm('Error: Sensor ID does not match UI ID. Reload to resolve the problem?')) {
                    window.location.href = "/ui?ip="+new URL(serverIP).hostname;
                }
            }
        } else {
            views.forEach(function(view) {
                view["elements"].forEach(function(ve) {
                    if (ve.hasOwnProperty("updateView")) {
                        ve["updateView"](data);
                    }
                });
            });
            appendDataToExportDataSet(data);
        }
    }
}

function restartConnection() {
    console.log("Restarting connection...");
    clearInterval(pingInterval);
    errorNode.textContent = "Error! Cannot connect to "+serverIP;
    errorNode.style.display = "block";
    setTimeout(function() {
        websocket.close();
        startWSClient();
    }, 1000);
}