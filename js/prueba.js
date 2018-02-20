$(document).ready(function() {
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

        alert('sí pasa todo');  
      });
  });
});