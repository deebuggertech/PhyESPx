<?php

if (isset($_GET["sensor"]) && isset($_GET["ip"])){
   $sensor = test_input($_GET["sensor"]);
   $ip = test_input($_GET["ip"]); 
} else if (isset($_GET["ip"])) {
   $ip = test_input($_GET["ip"]);
   header("Location: sensor-detection?ip=$ip");
   die();
} else {
   echo "ERROR: MISSING PARAMETERS!";
   die();
}


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
  <title>ERROR</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="/res/style.css">
  <script src="/res/chart.js"></script>
  <script src="/sensor/<?php echo $sensor; ?>/script.js"></script>
  <script> let serverIP = "ws://<?php echo $ip; ?>:81"; </script>
  <script src="/res/client.js"></script>
  <script src="/res/builder.js"></script>
</head>

<body>
<div id="header">
    <a href="/"><img id="logo" src="/res/logo.png"/></a>
    <div id="titleBar">
      <h1 id="title">ERROR</h1>
    </div>
    <div id="buttons">
      <div id="measuring" title="[space]" onclick="toggleMeasuring()"></div><div id="clear" title="[del]" onclick="clearData()"></div><div id="export" title="[ctrl][s]" onclick="exportData()"></div>
    </div>
</div>

<div id="viewSelectorBar">
  <ul id="viewSelector">
  </ul>
</div>

<div id="views"></div>
<div id="error">No error.</div>

</body>
</html>