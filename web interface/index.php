<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>PhyESPx Hub</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="res/style.css">
  <link rel="stylesheet" href="res/hub/style.css">
</head>

<body>

<div id="modal" class="modal"></div>

<div id="header">
    <img id="logo" src="res/logo.png"/>
    <div id="titleBar">
      <h1 id="title">Device Hub</h1>
    </div>
        <div id="buttons">
              <div id="settings" onclick="openSettings()"></div>
        </div>
        <style>
        #settings {
          background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAgHSURBVHhe7ZsHjBVFGIA5FRtW7GgUjBoLdoVgjQVjjCZgBXti1ESNGlvsXaPRKCg2Yq+xNyJBowGJJWLvLfYSFUVEFCt+3+1w98rW43hvT96XfNk2u293dnb2n5l9vVq0aNGiRXlpC9MezezZs1dhciUu2r4i4sm2trZrw/z8DRl0GP6FlXyOy4YkXWaBMO2xkAk+BbviQu0rOlkNt41m52MsJfgDxnErLhiSdolSlyAurj8Ow95hVRx74PLRbB2WoNWj2Xo47tZ4DFbWXT0DTnoTfAp/w5dwBPYNm92+AA7EezGN07CjLmJ+YRyC1+G3aN11I/acTOJkvfBH8F+cg/NvoXd8G7wG38HayrkWt7+OZ6D7jcaPsZbbsfyZxEkugZM84xR+D9Oi/BGmcXjME7Gq2iljHTQTv4xmE+nqnV44TOPwLfgqsdO/0WJE6TKIE5zNZDROb1/ROCbg5Gi2k1K+xcikKUwej5YagjfjVn7372ixkzK/5kehj1sjeAstQXWUOYPexHHR7DzH0jMjzFdR5gxaDvtFs5lYb72D9+NtaMZOw7xsGqY9B163u4RXbxrGRq/hIdgP++BCuDiuihfgNMzia7RHoPxwoka6A/BmzOIZHBx2rYNtC+K+aDSehhl9Ca6E5esC4qTMlGXQJsAN+CH+g2l8gzuHQyRCGjPpKHfIwCDyTRyDu6KlsPmZxUmsiOfi21gES1htF0cspDPzP3KnnFiivsJLwyGaBydh+yipuyKN3cMhMiGt9dL17XsV46Nue4txsEG4f41rhM1ZdOU8spojHYQA8BP0bdccyIyHsBbvWurFs90S9KOJCzIoHCIXpD8TK3sH8tA9JYgDLcFkp2ipCtfZ9Tkv2DhMM+H8vM51sTmVLidgZ1Yc3rE9Q7JY2G73xkH4KBapi+xMWywcJhXSrYV54iHxbTYZ7T9aMxyi63CQxdDOpiTuwsySShpf9QZ3h6KP6y+YhmGAAWJqqWC7sc1YzMLOtyvRbljfrOnnTAJP2IrWIZXE4RO2rYGfYhJf4KoheRWsN0bZEC/Cg10O63vjFZjFz3gkxvZZs97MORtnYho/4UFht2xIbObshxZ5HxO7LI/Hyr5dL2IFPBrT+BuNUiv3XRTd15N3/Mrf8BE4NiQxzUY4HbMwk+7EndARjqXQYx+Az6K/n4XNlaXCT2dD4pH4q3vWYGk4BwfjeZhWcioxA8yIi3Fb9I1i+6eWP9FSa8nyJj2ARZiB36HHKcJJ4dKzIfHO6I+kYZHNagok4R1Na4R6cVuipWC8KxrAJeHy64iriL7BRaLZRBbHroYI1jNpfcqfoz18dkEMcUUD8HHsH+arqLtIos53mTwSLTWF+/A7PBSXdkUDsN8p9jGLfUWSm969J3Dl9hWNYxauj771HsakEdN5wfe4CQXk22gxIvYxIdFrTB6KlhqG7aQb8TM8ERuZOeLvnRLNdpJWj4zBqdFsQ/AO3sLNMaPexz9dGYPn9AbWjUBk4H4v46/tS/VY703h6cnXHCHhmvgqFsG30/do/JQ2ihnHVGwPKJna/LjalQHDBMMCI3Y71ZbD3fBuzOI99FiGJsZJQ/F+NDicg+HLcZj/xUPivTBPPOHYt8HaTbgPegFb4XC0dzAunorDDK0MFJdEQ3+DxftwO6zqIGPZeMkgNAlv2MiQvAPWGWN5PDPYnsljsVDmGCVPwDxYLBNHBdi2Ob5owhw4YNgBy7bzrLQTYbtfgVjC4ngfU/uk2N4X82WOCXEzPB/ztKy98IFh90RI40k85w45sETYYDTWyoR0Po72JcdhCU4bj8/GA+B6aKPPUuOznnRHKrG1PSwcJhPSGh3nbQI4CmH9dyHaNLFPOSkkaUObMLV4DX5cNXdwkGvxMyzadHDIpeODpjyQfmL7nsWwfWWl6kBiLGyzV7K2xW7FO9eddT57Q9HnNH8lFTGFV/JPYT4vjn8X7Re2t9J6KK158gI+huMrvAd/xLmDXC4yHFLJEeEQuWGfA7FoS1vszIrtU5rXFC01leTq7qyhT5j2GMygrg6FbMpdzRd1drI2pn2xmkSjPoOph4u0g2ocGpAVqajtLEv8xLYW0hr4feKOOfANZOVsEOdLZAfsSsZ2H5zAymiHuW+MvONUvl4zP9QmjSObp7tDDmyq3IF745LhEOWBkzJ8d5jkS8xiFp6AicEY2+x/9uOBPMMulprVsfx1FSc5yjPOgW0xR1D9trmj4mbejNkCHXKJ63+uxcd7bNi9NCRWspzsFkyewbzF3O4Kv/VzzPwvtAtzI1wR81TmP+NwYquJ0WLJIYOsk2yINgo/N0mMlptFWhxkh3lqS7qbsaTtH82WHO6kr+RGDblUYuhQqv9LJJWg7XHLaLahWG+NiGbLQV0GcQeNa+yFa1Z9UPX3pWYTV4L87mavaLYprIPN/P0q4jLoY7T7IK6N5jrHjR5FRwmKtuMctX0Qv8CkfZ/Cp6PZkkIRd9TADrHKnkU/PrgM7QM2CHTU4yy03zcL/wh3Kvqpiy+A1fBkdP2c9p9j9s+jvZtFG8GNh5P0Ip5Eh2OuQi+urt3FunXRJkISNjHqvkhlnf3fNiv8fMbPa17BAWFzz4ATtiRtEBZjYbslIm0ExAtP/c8F2/1oe6Ww+P+Dizsck7giJJt/IROWR1v2tTg6kfl3gTKT1tTIDQ1M32iToqUq3sYPotmeSbe9LSgpOzI5Bisz3XDhcjLwn2ixRYsWLVq06DZ69foPG7a/83W+DT8AAAAASUVORK5CYII=);
        }

        @media only screen and (max-width: 700px) {
        #settings{
            min-width: 1.5em !important;
        }
        }
        </style>
</div>

<div class="content_container">

<div class="heading_container">
<h2>Devices in Subnet:</h2>
<div id="buttons" style="top: -15px;">
    <div id="refresh" class="hover_zoom" style="background-image: url('res/hub/refresh.png'); background-color:transparent; background-size: 50%;" onclick="scanForDevices();"></div>
</div>
</div>

<!--This is dynamically filled with sensor_container elements-->
<div id="sensor_container"></div>


<div style="opacity: 0.4;"><!--BETA FEATURES-->

<div class="heading_container">
<h2>Experiments <span style="font-style: italic;">(beta)</span>:</h2>
</div>

<!--This is dynamically filled with sensor_container elements-->
<div id="experiment_container"></div>

</div>

</div>

<div class="footer_container">
&copy; 2021 - <?php echo date("Y"); ?> deebugger.de | UI vers. <?php
                                                              include 'config.php';
                                                              echo $UI_VERS;
                                                              ?>
</div>

</div>


<script>

var scanningForDevicesFlag = false;


function scanForDevices(){

if(scanningForDevicesFlag) return;
scanningForDevicesFlag = true;
document.getElementById("refresh").style = "background-image: url('res/hub/loading.gif'); background-color:transparent; background-size: 80%;";
document.getElementById("sensor_container").innerHTML = "";
var ipStart = "<?php
               list($s1,$s2,$s3,$s4) = explode(".", $_SERVER['SERVER_ADDR']);
               echo $s1.".".$s2.".".$s3.".";
               ?>";
for (let i = <?php echo $TRANSMITTER_IP_RANGE_MIN; ?>; i <= <?php echo $TRANSMITTER_IP_RANGE_MAX; ?>; i++){
    console.log("Checking ws://"+ipStart+i+":81/");
	const ws = new WebSocket("ws://"+ipStart+i+":81/");
	ws.onmessage = function (event) {
	    var deviceInfo = JSON.parse(event.data);
	    if(deviceInfo.sensorID > -1){
	    console.log("Connected to phyESPx Device on ws://"+ipStart+i+":81/");
	    ws.close();

	    var http = new XMLHttpRequest();
            http.open("GET", "sensor/"+deviceInfo.sensorID+"/properties.json");
            http.send();

            http.onreadystatechange = (e) => {
              if(http.status == 200 && http.readyState == 4){
                var sensorProperties = JSON.parse(http.responseText);

                var sensor_element = "<a href=\"ui/?sensor="
                sensor_element += deviceInfo.sensorID;
                sensor_element += "&ip="
                sensor_element += ipStart+new String(i);
                sensor_element +="\"><div class=\"sensor_element hover_zoom\" <b>";
                sensor_element += new String(sensorProperties.description);
                sensor_element += "</b><br><img src=\"sensor/";
                sensor_element += new String(deviceInfo.sensorID);
                sensor_element += "/icon.png\"><br><span>";
                sensor_element += ipStart+new String(i);
                sensor_element += "</span></div></a>";
                document.getElementById("sensor_container").insertAdjacentHTML( 'beforeend', sensor_element );

  	            }
            }

  	    }
	}

	sleep(50);
	setTimeout(function() {
	ws.close();
	}, 1000);

}

setTimeout(function() {
document.getElementById("refresh").style = "background-image: url('res/hub/refresh.png'); background-color:transparent; background-size: 50%;";
scanningForDevicesFlag = false;
}, 1000);

}

scanForDevices();

setInterval(function () {
scanForDevices();
}, 30000);


function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function scanForExperiments() {

    document.getElementById("experiment_container").innerHTML = "";

    var http = new XMLHttpRequest();
    http.open("GET", "experiment/list.php");
    http.send();
    http.onreadystatechange = (e) => {
        if (http.status == 200 && http.readyState == 4) {
            var experimentIDs = JSON.parse(http.responseText);

            experimentIDs.forEach(function(id, index) {
                    console.log("Fetching Data for Experiment /" + id);

                    var http = new XMLHttpRequest();
                    http.open("GET", "experiment/" + id + "/properties.json");
                    http.send();
                    http.onreadystatechange = (e) => {
                        if (http.status == 200 && http.readyState == 4) {
                            var experimentProperties = JSON.parse(http.responseText);

              		    var experiment_element = "<a href=\"experiment/";
                	    experiment_element += id;
                	    experiment_element +="\"><div class=\"sensor_element hover_zoom\"><b>";
                            experiment_element += new String(experimentProperties.description);
                            experiment_element += "</b><br><img src=\"experiment/";
                            experiment_element += new String(id);
                            experiment_element += "/icon.png\"><br><span>";
                            experiment_element += new String(experimentProperties.caption);
                            experiment_element += "</span></div></a>";
                            document.getElementById("experiment_container").insertAdjacentHTML( 'beforeend', experiment_element );

                        }

                    }
            });
        }

    }

}

scanForExperiments();

/////////////////////////////////////////////////////////////////////////

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
		
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/////////////////////////////////

var modal = document.getElementById("modal");
	
var client = new HttpClient();

client.get('https://api.deebugger.de/phyespx/webinterface/news/', function(response) {	
	const data = JSON.parse(response);
	
	if(data.available=="true"){
		
		if((getCookie(data.messageid)=="")||(data.ignoreCookie=="true")){ //if the message has not been seen or is very important

		var content = document.createElement('div');
		content.classList.add('modal-content');

		var header = document.createElement('div');
		header.classList.add('modal-header');
				var closeSpan = document.createElement('span');
				closeSpan.classList.add('close');
				closeSpan.appendChild(document.createTextNode("×"));
					closeSpan.onclick = function() {
					  modal.style.display = "none";
					  document.cookie = data.messageid+"="+"seen; SameSite=Lax";
					}
				header.appendChild(closeSpan);
				var heading = document.createElement('h2');
				heading.appendChild(document.createTextNode(data.heading));
				header.appendChild(heading);
		content.appendChild(header);

		var body = document.createElement('div');
		body.classList.add('modal-body');
				var textcontent = document.createElement('p');
				textcontent.appendChild(document.createTextNode(data.content));
				body.appendChild(textcontent);
		content.appendChild(body);

		modal.appendChild(content);	

		modal.style.display = "block";

		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
				document.cookie = data.messageid+"="+"seen; SameSite=Lax";
			 }
		}
			
		}
	}
});	

function openSettings(){
 let password = prompt("This step requires privileges. Please enter password!");
 window.location.href = "settings?password="+password;
}
	
</script>



</body>
</html>

