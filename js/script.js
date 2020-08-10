// variable that points to div
var dataContainer = document.getElementById("recall-info");

// Request data
var langList = document.getElementById("language");

// Get form from html
const form = document.getElementById('form');

langList.addEventListener("click", function(){
  var langValue = langList.options[langList.selectedIndex].value;
  // debugging
  console.log(langValue);
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET',"https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/" + langValue);
  // debuggin
  console.log("https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/" + langValue);
  ourRequest.onload = function(){
    // log to debug
    var ourData =  JSON.parse(ourRequest.responseText);
    var allData = ourData.results.ALL;
    // log ourData var to explore it
    console.log(allData);
    renderHTML(allData);
  };
  ourRequest.send();

});

// add function to add html pagagraphs to the page
function renderHTML(data){
  var htmlString = "";
  // Iterate through our data
  for (i=0; i<data.length; i++){
    htmlString += "<p> ID: " + data[i].recallId + " Description: " + data[i].title +  "</p>";
  }
  dataContainer.insertAdjacentHTML('beforeend', htmlString);
};
