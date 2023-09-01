<?php

if (!isset($_GET["ip"])) {
   echo "ERROR: MISSING PARAMETERS!";
   die();   
}

$ip = test_input($_GET["ip"]);

function test_input($data) {
     $data = trim($data);
     $data = stripslashes($data);
     $data = htmlspecialchars($data);
     return $data;
}


?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Sensor Detection</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="/res/style.css">
  <link rel="stylesheet" href="/res/hub/style.css">
</head>

<body>

<div id="header">
    <img id="logo" src="/res/logo.png"/>
    <div id="titleBar">
      <h1 id="title">Sensor Detection</h1>
    </div>
</div>

<div class="content_container" style="top: 50% !important;">
<h2 id="message">You are being redirected...</h2>
<p id="hint"></p>
<script>
setTimeout(function() {
  document.getElementById("message").innerHTML="Redirect Failed!";
  document.getElementById("hint").innerHTML="Reason: cannot connect to the server component. <br>Solution: turn on the transmitter and check the network.";
}, 2000);
</script>
</div>


</div>


<script>
const ws = new WebSocket("ws://<?php echo $ip; ?>:81/");
ws.onmessage = function (event) {
  var deviceInfo = JSON.parse(event.data);
  if(deviceInfo.sensorID > -1){
  ws.close();
  window.location.replace("../?sensor="+deviceInfo.sensorID+"&ip=<?php echo $ip; ?>");
  }
}	
</script>



</body>
</html>

