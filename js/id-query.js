// select drop down list div element
var menuContainer = document.getElementById("menu");
//debuggin
console.log(menuContainer);
var langValue = "en"

var menuList = document.getElementById("menu");

menuList.addEventListener("click", function() {

  var ourRequest = new XMLHttpRequest();
  var url = "https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/" + langValue;
  ourRequest.open('GET', url);
  // debuggin
  console.log(url);
  ourRequest.onload = function(){
    console.log("Loaded")
    // log to debug
    var ourData =  JSON.parse(ourRequest.responseText);
    var allData = ourData.results.ALL;
    // log ourData var to explore it
    // console.log(allData);

    for (i=0;i<allData.length;i++){
      var idData = allData[i].recallId;
      //debugging
      //console.log(idData);
      // populate drop down list
      var option = document.createElement("OPTION"),
          txt = document.createTextNode(idData);
      option.appendChild(txt);
      option.setAttribute("value",idData);
      menuContainer.insertBefore(option, menu.lastChild);
      }
    };
    ourRequest.send();
});
