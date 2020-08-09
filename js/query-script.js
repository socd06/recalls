// Read data from HTML label form
var labelList = document.getElementById("label");

// Read data from HTML language form
var langList = document.getElementById("language");

// Event listener for every time you click on the list
langList.addEventListener("click", function(){
  // Read language selection
  var langValue = langList.options[langList.selectedIndex].value;

  // Read label selection
  var labelValue = labelList.options[labelList.selectedIndex].value;

  getRecent(langValue, labelValue);
});

// add function to add html pagagraphs to the page
function getRecent(lang, label) {
    // for debugging
    console.log(label)
    var base = 'http://healthycanadians.gc.ca/recall-alert-rappel-avis';
    var uri = base + '/api/recent/' + lang;
    $.ajax({
        url:uri,
        type:'GET',
        Accept:"application/json",
        dataType: 'json',
        success:function(data){
            var frag = document.createDocumentFragment();
            try {
              switch(label){
                  case "ALL":
                    for (var i=0; i<data.results.ALL.length; i++) {
                        var a = document.createElement("a");
                        var title = document.createTextNode(data.results.ALL[i].title);
                        a.appendChild(title);
                        a.setAttribute("href", base + data.results.ALL[i].url);
                        frag.appendChild(a);
                        frag.appendChild(document.createElement("br"));
                    }
                    break;
                  case "FOOD":
                    for (var i=0; i<data.results.FOOD.length; i++) {
                        var a = document.createElement("a");
                        var title = document.createTextNode(data.results.FOOD[i].title);
                        a.appendChild(title);
                        a.setAttribute("href", base + data.results.FOOD[i].url);
                        frag.appendChild(a);
                        frag.appendChild(document.createElement("br"));
                    }
                    break;
                  case "HEALTH":
                    for (var i=0; i<data.results.HEALTH.length; i++) {
                        var a = document.createElement("a");
                        var title = document.createTextNode(data.results.HEALTH[i].title);
                        a.appendChild(title);
                        a.setAttribute("href", base + data.results.HEALTH[i].url);
                        frag.appendChild(a);
                        frag.appendChild(document.createElement("br"));
                    }
                    break;
                  case "VEHICLES":
                    for (var i=0; i<data.results.VEHICLES.length; i++) {
                        var a = document.createElement("a");
                        var title = document.createTextNode(data.results.VEHICLES[i].title);
                        a.appendChild(title);
                        a.setAttribute("href", base + data.results.VEHICLES[i].url);
                        frag.appendChild(a);
                        frag.appendChild(document.createElement("br"));
                    }
                    break;
                  case "CPS":
                    for (var i=0; i<data.results.CPS.length; i++) {
                        var a = document.createElement("a");
                        var title = document.createTextNode(data.results.CPS[i].title);
                        a.appendChild(title);
                        a.setAttribute("href", base + data.results.CPS[i].url);
                        frag.appendChild(a);
                        frag.appendChild(document.createElement("br"));
                    }
                  }
                }
            catch(err){
              $(document).ready(function(){
                alert("No result was returned for the selected category.")
              });
            }
            $("#responses").empty();
            $("#responses")[0].appendChild(frag);
        },
        error:function(error){
        },
    });
    return;
};
