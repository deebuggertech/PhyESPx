var currentView = 0;
var body, header, title, viewsNode, viewSelector, errorNode, buttons;


/* User Interface Switching */

function createViews() {
    views.forEach(function(view) {
        view["elements"].forEach(function(ve) {
            viewsNode.innerHTML += ("<div class=\"elementBlock\">" + ve["html"] + "</div>");
        });
    });
    views.forEach(function(view) {
        view["elements"].forEach(function(ve) { //workaround: can't be done in upper iteration
            if (ve.hasOwnProperty("createView")) {
                ve["createView"]();
            }
        });
    });
}

function switchViewNew(newView) {
    leaveExclusive();
    currentView = newView;

    var liElements = viewSelector.getElementsByTagName("li");
    for (var i = 0; i < liElements.length; i++) {
        var el = liElements[i];
        if (i == currentView)
            el.classList.add("active");
        else
            el.classList.remove("active");
    };

    views.forEach(function(view, i) {
    Array.from(document.getElementsByClassName("view"+i)).forEach(
        function(element, index, array) {
            if(i == currentView){
                element.style.display = 'block';
            }else{
                element.style.display = 'none';
            }
        }
    );
    });

}

function setExclusive(i) {
    body.classList.add("exclusive");
    var elem = document.getElementById("element" + i);
    elem.classList.add("exclusive");
}

function leaveExclusive() {
    body.classList.remove("exclusive");
    Array.from(document.getElementsByClassName("exclusive")).forEach(
            function(element, index, array) {
            element.classList.remove("exclusive");
            }
    );
}

function toggleExclusive(i) {
    var elem = document.getElementById("element" + i);
    if ((elem.classList && elem.classList.contains("exclusive")) || (elem.className.indexOf("exclusive") > -1))
        leaveExclusive();
    else
        setExclusive(i);
}


/* Loading Procedure Of The Site */

function ready(fn) { //called on startup
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") { //if the document has already been loaded
        fn();
    } else { //if the document is still loading
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function() {
    body = document.getElementsByTagName("body")[0];
    header = document.getElementById("header");
    title = document.getElementById("title");
    viewsNode = document.getElementById("views");
    viewSelector = document.getElementById("viewSelector");
    errorNode = document.getElementById("error");
    buttons = document.getElementById("buttons");

    document.title = sensorName;
    title.innerHTML  = sensorName;
    clearExportDataSet();

    if (views.length > 1) {
        body.classList.add("multiView");
    }

    views.forEach(function(view, i) {
            var listElement = document.createElement("li");
            listElement.appendChild(document.createTextNode(view.name));
            function switchViewCaller(i) { //workaround by PhyPhox developers
                return function() {
                    switchViewNew(i);
                };
            }
            listElement.addEventListener("click",  switchViewCaller(i));
            viewSelector.appendChild(listElement);
    });

    createViews();

    switchViewNew(0);

    startWSClient();

});


