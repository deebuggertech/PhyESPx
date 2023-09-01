<?php

$password = test_input($_GET["password"]);

if ($password == "nutella"){
echo "Server shutting down...";
ob_flush();
flush();
sleep(1);
system("/sbin/shutdown -h now");
}

function test_input($data) {
     $data = trim($data);
     $data = stripslashes($data);
     $data = htmlspecialchars($data);
     return $data;
}

?>