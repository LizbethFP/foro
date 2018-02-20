/* VARIABLE GLOBAL DEL CONTENEDOR DONDE APARECERÁN TODOS LOS TEMAS SIN FILTRAR */
const $TodosLosTemasDiv = $('#todos-los-temas');
const $botonCrearTema = $('creartema-btn');

$(window).on('load', function() {
  $TodosLosTemasDiv.html('');
  obtenerTodosTemas();
  añadirTemaNuevo();
});

/* CONSEGUIR TODOS LOS TEMAS */
const obtenerTodosTemas = function() {
  $.ajax({
    url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(añadirTemas)
    .done(temasDeBusqueda)
    .fail(manejarError);
};

/* Imprimir todos los temas del API */
const añadirTemas = function(temas) {
  // console.log(temas);
  // console.log(temas[0].content);
  temas.forEach(function(tema) {
    const temita = tema.content;
    // console.log(temita);    
    const autor = tema.author_name;
    const contadorRespuesta = tema.responses_count;

    $TodosLosTemasDiv.append(` <h2>${autor}  <span class="totalRespon"> ${contadorRespuesta} respuestas</span></h2>
    <p>${temita}.</p>`);
  });
};

/* BUSCAR COINCIDENCIAS DE TEMAS */
const temasDeBusqueda = function(temas) {
  let temasCoincidentes = temas.map((val) => val.content);
  console.log(temasCoincidentes);
  $('#buscador').autocomplete({
    source: temasCoincidentes
  });
};

/* Función para manejar errores */
const manejarError = function() {
  console.log('Se ha producido un error');  
};

/* PUBLICAR TEMAS */
// const publicarTemas = function() {
//   $.ajax({
//     url: 'http://examen-laboratoria-sprint-5.herokuapp.com/topics',
//     // dataType: 'json',
//     method: 'POST',
//   }).done(añadirTemaNuevo)
//     .fail(manejarError);
// };

const añadirTemaNuevo = function() {  
  $('#guardar').click(function() {
    let $inputNombreVal = $('#input-nombre').val();
    let $inputMensajeVal = $('#input-mensaje').val();

    $.post('http://examen-laboratoria-sprint-5.herokuapp.com/topics',
      {
        author_nam: $inputNombreVal,
        content: $inputMensajeVal
      },
      function(data, status) {
        alert('Data: ' + author_nam + '\nStatus: ' + content);
      });
  }
  );
};
