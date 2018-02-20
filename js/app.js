$(document).ready(function() {

/* Imprimir todos los temas del API */
  const añadirTemas = function(temas) {
  // console.log(temas);
  // console.log(temas[0].content);
    temas.forEach(function(tema) {
      const temita = tema.content;
      // console.log(temita);    
      const autor = tema.author_name;
      const contadorRespuesta = tema.responses_count;
    
      $TodosLosTemasDiv.append(` <h2>${autor}</h2>  <h4><span class="totalRespon"> ${contadorRespuesta} respuestas</span></h4>
    <p><a href="">${temita}</a></p>`);
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
  /* VARIABLE GLOBAL DEL CONTENEDOR DONDE APARECERÁN TODOS LOS TEMAS SIN FILTRAR */
  const $TodosLosTemasDiv = $('#todos-los-temas');

  /* CONSEGUIR TODOS LOS TEMAS */
  $.ajax({
    url: 'https://examen-laboratoria-sprint-5.herokuapp.com/topics',
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(añadirTemas)
    .done(temasDeBusqueda)
    .fail(manejarError);

  $TodosLosTemasDiv.html('');

  /* CREAR UN TEMA NUEVO AL DAR CLIC EN GUARDAR */
  $('#guardar').click(function() {
    alert('sí pasa');
    let nuevoAutor = $('#input-nombre').val();
    console.log(nuevoAutor);
    let nuevoTema = $('#input-mensaje').val();
    console.log(nuevoTema);
    $.post('https://examen-laboratoria-sprint-5.herokuapp.com/topics',
      {
        author_name: nuevoAutor,
        content: nuevoTema
      },
      function(data, status) {
        console.log(data);
        let firstChil = $('#todos-los-temas').eq(0);
        $(firstChil).prepend(` <h2 data-id=${data.id}>${data.author_name}</h2>  <h4><span class="totalRespon"> respuestas</span></h4>
      <p><a href="">${data.content}</a></p>`);         

        // alert('sí pasa todo');  
      });
  });
});