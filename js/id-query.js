// select drop down list div element
var menuContainer = document.getElementById("menu");
//debuggin
console.log(menuContainer);
var langValue = "en"

var menuList = document.getElementById("menu");

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

menuList.addEventListener("click", function() {
  var selection = menuList.options[menuList.selectedIndex].value;
  //debugging
  console.log("Chose " + selection + " recallId.");
  getRecall(selection,langValue);

});

function getRecall(id, lang) {
    var base = 'http://healthycanadians.gc.ca/recall-alert-rappel-avis';
    var uri = base + '/api/' + id + '/' + lang;
    $.ajax({
        url:uri,
        type:'GET',
        Accept:"application/json",
        dataType: 'json',
        success:function(data){
            console.log(data.title);
            var frag = document.createDocumentFragment();
            var h2 = document.createElement("h2");
            var title = document.createTextNode(data.title);
            var p = document.createElement("p");
            var text = document.createTextNode(data.panels[0].text);
            h2.appendChild(title);
            p.appendChild(text);
            frag.appendChild(h2);
            frag.appendChild(p);
            $("#details").empty();
            $("#details")[0].appendChild(frag);
        },
        error:function(error){
        },
    });
    return;
};
