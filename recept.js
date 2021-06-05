var receptekTomb = [];

$(function () {

    $("article").on("click", "div", kivalasztottReceptMegjelenit);
    $("article").on("click", ".torol", function () {
        var index = Number($(this).attr("index"));
        receptekTomb.splice(index, 1);
        receptMegjelenit();


    });
    $("article").on("click", ".modosit", function () {
        var index = Number($(this).attr("index"));
        urlapModositandoAdatBetolt(index);

    });

    $.ajax(
            {url: "receptek.json", success: function (result) {
                    console.log(result);
                    receptekTomb = result;
//                   
                    receptMegjelenit();
                    urlapMegjelenit();

//                    
                }});

});


//function megjelenit() {
//    var ID = Number($(this).attr("id"));
//    console.log(ID);
//    if (ID > 0)
//        megjelenitRecept(receptekTomb[ID - 1]);
//    if (ID > 0)
//        megjelenitKep(receptekTomb[ID - 1]);
//}
//
//function megjelenitKep(recept) {
//$("section").append("<img>");
//$( "section img" ).attr({
//src: recept.eleresi_ut,
//title: "kep",
//width: "300",
//height: "200",
//alt: "kep"
//});
//}
function receptMegjelenit() {
    $("article").empty();
    for (var item in receptekTomb) {
        var receptek = "\<p><b>Ár</b>: " + receptekTomb[item]["ar"] + " Ft</p>\n\
                          <p><b>Étel neve</b>: " + receptekTomb[item]["nev"] + "</p>\n\
                          <p><b>Kategória</b>: " + receptekTomb[item]["kategoria"] + "</p>\n\
                          <p> <b>Elkészítési idő</b>: " + receptekTomb[item]["elkeszitesi_ido"] + "</p>\n\
                           <img src='" + receptekTomb[item]['eleresi_ut'] + "' alt='" + receptekTomb[item]['eleresi_ut'].slice(6, receptekTomb[item]['eleresi_ut'].length - 4) + "' >\n\
                           <p><b>Db</b>: <input type='text' id='" + receptekTomb[item]["nev"] + "_db'></p>\n\
                            <div id=gombok><input type='button' class='modosit' index='" + item + "' value='Módosít'><input type='button' class='torol' index='" + item + "' value='Töröl'></div>"; //adok egy index attribútumot is a gomboknak
        $("article").append("<div id='" + receptekTomb[item]["nev"] + "'>" + receptek + "</div>");

    }

}
function kivalasztottReceptMegjelenit() {
    $("aside").empty();
    $("aside").remove("#kivalasztott_etel");
    var etelID = $(this).attr("id");
    var i = 0;
    van = false;
    while (i < receptekTomb.length && !van) {

        if (etelID === receptekTomb[i].nev) {
            van = true;
            var receptek = "<p><b>Étel neve</b>: " + receptekTomb[i].nev + "</p>\n\
                          <p><b>Kategória</b>: " + receptekTomb[i].kategoria + "</p>\n\
                          <p> <b>Elkészítési idő</b>: " + receptekTomb[i].elkeszitesi_ido + "</p>\n\
                           <img src='" + receptekTomb[i].eleresi_ut + "' alt='" + receptekTomb[i].eleresi_ut.slice(6, receptekTomb[i].eleresi_ut.length - 4) + "' >\n\
                            <p><b>Ár</b>: " + receptekTomb[i].ar + " Ft</p>";
            $("aside").append("<div id='kivalasztott_etel'>" + receptek + "</div>");
        }
        i++;
    }



}


function ujEtel(){
  
        var etelObjektum = {
        nev: $("#nev").val(),
        elkeszitesi_ido: $("#elkeszitesi_ido").val(),
        eleresi_ut: $("#eleresi_ut").val(),
        ar: $("#ar").val(),
        kategoria: $("#kategoria").val()                    
        };       
        receptekTomb.push(etelObjektum);
        receptMegjelenit();
}
