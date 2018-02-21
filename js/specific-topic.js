/* VARIABLE GLOBAL DEL ID */
var topicId = getParameterByName('topic_id');

/* Imprimir el tema según su topic id */
const getTopic = function() {
  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}`,
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(showTopic)
    .done(getSpecificAnswer)
    .fail(handleError);
};

/* Imprimir el tema del id seleccionado */
const showTopic = function(topics) {
  const existingTopic = topics.content;
  const author = topics.author_name;
  $('#topic').append(`<h2>${existingTopic}</h2>  <br>        <p>por:</p><h2>${author}</h2>`);
};

/* Obtener las respuestas del topic id encontrado */
const getSpecificAnswer = function() {
  $.ajax({
    url: `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    // dataType: 'json',
    contentType: 'aplication/json'
  }).done(showSpecificAnswers)
    .fail(handleError);
};
/* Imprimir todas las respuestas de ese topic id */
const showSpecificAnswers = function(response) {
  if (response.error === 'Aún no hay respuesta alguna') {
    console.log(response.error);
  } else {
    response.forEach(function(resp) {
      const answerToTopic = resp.content;
      const answerAuthor = resp.author_name;
      $('#answer-div').append(`<h2>${answerToTopic}</h2><br><p>por:</p><h2>${answerAuthor}</h2><hr>`);
    });
  }
};

/* Función para manejar errores */
const handleError = function() {
  console.log('Se ha producido un error');
};

getTopic();

/* PUBLICAR RESPUESTAS */
$('#post-answer').click(function() {
  // alert('sí pasa');
  let newAuthor = $('#author').val();
  let newTopic = $('#message').val();
  $.post(`https://examen-laboratoria-sprint-5.herokuapp.com/topics/${topicId}/responses`,
    {
      author_name: newAuthor,
      content: newTopic,
      topic_id: topicId
    },
    // cuando se logra hacer post exitosamente, se agrega los valores de la data al html
    function(data, status) {
      let firstChild = $('#answer-div').eq(0);
      $(firstChild).prepend(`<h2>${data.content}</h2><br><p>por:</p><h2>${data.author_name}</h2><hr>`);
      $('#author').val('');
      $('#message').val('');
    });
});
