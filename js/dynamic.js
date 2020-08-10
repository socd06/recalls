// div element variable
var dataContainer = document.getElementById("titles");

var ourRequest = new XMLHttpRequest();

var langValue = "en";

var url = "https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/" + langValue;
//debugging
console.log(url);
ourRequest.open("GET",url);
ourRequest.onload = function(){
  var ourData = JSON.parse(ourRequest.responseText);
  var allData = ourData.results.ALL;

  //debugging
  console.log(allData);

  dataContainer.innerHTML = `
  <h2 class="app-title">Most Recent ${allData.length} Recall Titles:</h2>
  ${allData.map(function(allData){
    const dateStamp = JSON.stringify(allData.date_published);
    // UNIX timestamp is in milliseconds
    const milliSeconds = dateStamp * 1000;
    // Create a dateObject
    const dateObject = new Date(milliSeconds);
    // convert dateObject to local date
    const canadianDate = dateObject.toLocaleString('ca-EN');
    // search for the first comma in the date
    var n = canadianDate.search(",");
    // only display date up to n to prevent repetitiveness
    // (all dates have the same time hour 20:00)
    var logDate = canadianDate.slice(0,n)
    return `
    <div class="container">
    <h3>${logDate}
    ID: ${allData.recallId} 
    </h3>
    <br>
    <span>${allData.title}</span>
    </div>
    `
  }).join("")}
  `
}
ourRequest.send();
