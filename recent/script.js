var langVar = "en";

var ourRequest = new XMLHttpRequest();

var url = "https://healthycanadians.gc.ca/recall-alert-rappel-avis/api/recent/" + langVar;

ourRequest.open('GET',url);

console.log(url);

ourRequest.onload = function(){
  console.log("Loaded");
  var ourData = JSON.parse(ourRequest.responseText);
  var allData = ourData.results.ALL;
  console.log(allData);
  console.log(allData[0].category);
}
ourRequest.send();

getRecent(langVar);

function getRecent(lang) {
    var base = 'http://healthycanadians.gc.ca/recall-alert-rappel-avis';
    var uri = base + '/api/recent/' + lang;
    $.ajax({
        url:uri,
        type:'GET',
        Accept:"application/json",
        dataType: 'json',
        success:function(data){
            var frag = document.createDocumentFragment();
            for (var i=0; i<data.results.ALL.length; i++) {
                // date element

                const dateStamp = JSON.stringify(data.results.ALL[i].date_published);
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

                console.log(logDate);

                var d = document.createElement("d");
                //console.log(data.results.ALL[i].date_published);

                var a = document.createElement("a");

                var title = document.createTextNode(data.results.ALL[i].title);

                var b = document.createElement("b");

                var finalDate = document.createTextNode(logDate);

                var category = document.createTextNode(data.results.ALL[i].category[0]);
                if (data.results.ALL[i].category[0] == "1"){
                  console.log("Food");
                  var mappedCategory = document.createTextNode("Food");
                }
                if (data.results.ALL[i].category[0] == "2"){
                  console.log("Vehicles");
                  var mappedCategory = document.createTextNode("Vehicles");
                }
                if (data.results.ALL[i].category[0] == "3"){
                  console.log("Health Products");
                  var mappedCategory = document.createTextNode("Health Products");
                }
                if (data.results.ALL[i].category[0] == "4"){
                  console.log("Consumer Products");
                  var mappedCategory = document.createTextNode("Consumer Products");
                }
                d.appendChild(finalDate);
                b.appendChild(mappedCategory);
                a.appendChild(title);
                a.setAttribute("href", base + data.results.ALL[i].url);
                frag.appendChild(d);
                frag.appendChild(document.createElement("br"));
                frag.appendChild(b);
                frag.appendChild(document.createElement("br"));
                frag.appendChild(a);
                frag.appendChild(document.createElement("br"));
            }
            $("#responses")[0].appendChild(frag);

        },
        error:function(error){
        },
    });
    return;
};
