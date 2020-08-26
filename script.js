
// GET functions
// Get all the tasks (ajax)
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

// Print all the tasks
function printTasks(tasks) {

  var target = $('#tasks');
  target.html("");

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i]['text'];
    var taskId = tasks[i]['id'];

    target.append('<li><span class="dot" >&#9679</span>  '+task+'<span class="done" data-id=\"'+taskId+'\">&#10007</span></li>');
  }
};


// POST functions
// Open and close a modal with input (text)
function openCloseModal() {
  var modal = $('#modal');
  var addTask = $('#addTask');
  var closeModal = $('.close');

  // When the user clicks on the button, opens the modal
  addTask.click(function () {
    modal.addClass('active');
  });

  // When the user clicks on "X", closes the modal
  closeModal.click(function () {
    modal.removeClass('active');
  });
};

// Add input click listener
function addTaskTextListener() {
  var target = $('#addTaskText');
  target.keyup(getTaskValue);
};

// Get value from input
function getTaskValue() {
  var target = $('#addTaskText');
  var taskText = target.val();

  if (taskText && event.which == 13) {
    addNewTaskAjax(taskText);

    $('#addTaskText').val("");

    var modal = $('#modal');
    modal.removeClass('active');
  }
};

// Add new task (ajax)
function addNewTaskAjax(taskText) {
  $.ajax({
    url: 'http://157.230.17.132:3006/todos',
    method: 'POST',
    data: {
      'text': taskText,
    },
    success: function (data) {
      var tasks = data;
      getTasks();
    },
    error: function (err) {
      console.log('err', err);
    }
  })
};


// DELETE functions
// Add on click listener
function addDeleteListener() {
  $(document).on('click', '.done', deleteTask);
};

// Delete selected task (ajax)
function deleteTask() {
  var taskDone = $(this);
  var idTaskDone = taskDone.data('id');
  console.log(idTaskDone);

  $.ajax({
    url: 'http://157.230.17.132:3006/todos/'+idTaskDone,
    method: 'DELETE',
    success: function (data) {
      console.log(data);
      getTasks();
    },
    error: function (err) {
      console.log('err', err);
    }
  })
};

function init() {
  getTasks();
  openCloseModal();
  addTaskTextListener();
  addDeleteListener();
};

$(document).ready(init);
