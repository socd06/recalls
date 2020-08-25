var langValue = "en";

var argText = document.getElementById("searchText");

var catOption = document.getElementById("catDrop");

try{
  argText.addEventListener("change",doSearch());
  argText.addEventListener("input",doSearch());
  catOption.addEventListener("click",doSearch());
}
catch(err){
  $("#responses").empty();
  $(alert("No results"));
}


function doSearch(lang, text, cat, lim, off) {
    $("#responses").empty();

    var cat = catOption.options[catOption.selectedIndex].value;
    console.log("Category:"+cat);

    var lang=langValue;
    console.log("Language:"+langValue);

    var text=argText.value;
    console.log("Search Text:"+text);

    var base = 'http://healthycanadians.gc.ca/recall-alert-rappel-avis';
    var uri = base + '/api/search?search=' + text + '&lang=' + lang + cat + '&cat='+ '&lim=' + lim + '&off=' + off;
    $.ajax({
        url:uri,
        type:'GET',
        Accept:"application/json",
        dataType: 'json',
        success:function(data){
            var frag = document.createDocumentFragment();
            for (var i=0;i<data.results.length;i++) {
                var a = document.createElement("a");
                var title = document.createTextNode(data.results[i].title);
                a.appendChild(title);
                a.setAttribute("href", data.results[i].url);
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
