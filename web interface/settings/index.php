<?php

$password = test_input($_GET["password"]);

if ($password != "nutella"){
sleep(0.2);
header("Location: /");
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
  <title>phyESPx Admin Area</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta http-equiv="refresh" content="60" />
  <link rel="stylesheet" href="/res/style.css">
</head>

<body>

<div id="header">
    <a href="/"><img id="logo" src="/res/logo.png"/></a>
    <div id="titleBar">
      <h1 id="title">Admin Area</h1>
    </div>
</div>

<div style="color: white; text-align: center; font-size: 150%; position: absolute; top: 50%; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%); width: 100%;">


<b>Server: </b><small>
<?php
echo $_SERVER['SERVER_NAME'];
echo " (";
echo $_SERVER['SERVER_ADDR'];
echo ")";
?>
</small><br><br>
<b>Uptime: </b><small>
<?php
$ut = strtok(@exec("cat /proc/uptime"), ".");
$days = sprintf("%2d", ($ut / (3600 * 24)));
$hours = sprintf("%2d", (($ut % (3600 * 24))) / 3600);
$min = sprintf("%2d", ($ut % (3600 * 24) % 3600) / 60);
$sec = sprintf("%2d", ($ut % (3600 * 24) % 3600) % 60);
 
if ($days == 1) {
echo ("1 Day, ");
}
else {
echo ($days . " Days, ");
}
 
if ($hours == 1) {
echo ("1 Hour, ");
}
else {
echo ($hours . " Hours, ");
}
 
if ($min == 1) {
echo ("1 Minute and ");
}
else {
echo ($min . " Minutes and ");
}

if ($sec == 1) {
echo ("1 Seconds");
}
else {
echo ($sec . " Seconds");
}
?>
</small><br><br>


<b>PhyESPx UI Version: </b><small><?php
                                    include '../config.php';
                                    echo $UI_VERS;
                                    ?>
                                    </small><br><br>
<b>PHP Version: </b><small>
<?php
echo phpversion();
?>
</small><br><br>
<br><br><br><br>


<b>Click <a href="shutdown.php?password=<?php echo $password; ?>">here</a> to shut down the server</b><br><br>
<b>Click <a href="reboot.php?password=<?php echo $password; ?>">here</a> to reboot the server</b>
</div>
</body>
</html>

