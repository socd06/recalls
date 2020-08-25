var langValue = "en";

getRecent(langValue);

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
                var a = document.createElement("a");
                var title = document.createTextNode(data.results.ALL[i].title);
                a.appendChild(title);
                a.setAttribute("href", base + data.results.ALL[i].url);
                frag.appendChild(a);
                frag.appendChild(document.createElement("br"));
            }
            $("#responses")[0].appendChild(frag);
        },
        error:function(error){
        },
    });
    return;
}
