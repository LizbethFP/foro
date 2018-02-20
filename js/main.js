var api = 'https://examen-laboratoria-sprint-5.herokuapp.com/topics';

var $listaTemas = $("#temas");

var cargarPagina = function () {
    leerTemas();
    $("#add-form").submit(agregarTema);
    $("#search-form").submit(filtrarTema);
}

var leerTemas = function () {
    $.getJSON(api, function(temas) {
        temas.forEach(crearTema);
    });
}

var plantilla = '<tr>' +
                   '<td>__tema__</td>' +
                   '<td>__autor__</td>' +
                   ' <td>__respuestas__ </td>'+
                '</tr>';

var crearTema = function (response) {
    var tema = response.content;
    var autor = response.author_name;
    var respuestas = response.responses_count;

    /*var $tr = $("<tr />");
    var $temaTd = $("<td />");
    $temaTd.text(tema);

    var $autorTd = $("<td />");
    $autorTd.text(autor);

    var $respuestas = $("<td />");
    $respuestas.text(respuestas);

    $tr.append($temaTd);
    $tr.append($autorTd);
    $tr.append($respuestas);

    $listaTemas.append($tr)*/
    
    var plantillaNueva = plantilla.replace("__tema__", tema).replace("__autor__",autor).replace("__respuestas__",respuestas);
    
    $listaTemas.append(plantillaNueva);
};


var agregarTema = function (e) {
  e.preventDefault();
  //alert("probando");
  var nuevoAutor = $("#nombre-autor").val();
  var nuevoTema = $("#nuevo-tema").val();
  $.post(api, {
      author_name : nuevoAutor,
      content: nuevoTema
  }, function (tema) {
    crearTema(tema);
    $("#myModal").modal("hide");
  });
};

var filtrarTema = function (e) {
    e.preventDefault(); 
    var busqueda = $("#search").val().toLowerCase();
    
    $.getJSON(api,function(tema){
        var tema = tema.filter(function(response){
            return
            (response.content).toLowerCase().indexOf(busqueda) >=0;
        });
        crearTema(tema);
    });       
};

$(document).ready(cargarPagina);
