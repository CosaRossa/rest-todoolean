// API:
// 	READ: GET - http://157.230.17.132:3000/todos
// 	INSERT: POST - http://157.230.17.132:3000/todos - DATA: text
// 	DELETE: DELETE - http://157.230.17.132:3000/todos/ID



function getTasks() {
  $.ajax({
    url: 'http://157.230.17.132:3006/todos',
    method: 'GET',
    success: function (data) {
      var tasks = data;
      printTasks(tasks);
    },
    error: function (err) {
      console.log('err', err);
    }
  })
};

function printTasks(tasks) {

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i]['text'];
    var taskId = tasks[i]['id'];

    $('#tasks').append('<li>'+task+'</li>');
  }
}

function init() {
  getTasks();
};

$(document).ready(init);
