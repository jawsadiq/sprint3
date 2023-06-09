var stroringData = [];

var form = document.getElementById('userForm');
let taskParent = document.querySelector("#taskParent");
var storedData = localStorage.getItem('formData');



console.log(storedData);

  // If there is stored data, parse it back into an object
  if (storedData) {
    stroringData = JSON.parse(storedData);
    renderTasks();
  }
  

form.addEventListener('submit', storingData)

function storingData(event) {

  event.preventDefault();
  
  var taskName = document.getElementById('name').value;
  var taskDescription = document.getElementById('description').value;
  var assignTo = document.getElementById('assign').value;
  var dueDate = document.getElementById('date').value;
  var status = document.getElementsByName('status');

  if (taskName.length < 5){
    document.getElementById('taskError').innerHTML = "Please enter more than 5 characters"
    return;
  }
  if (taskDescription.length < 5){
    document.getElementById('descriptionError').innerHTML = "Please enter more than 5 characters"
    return;
  }
  if (assignTo.trim() ===''){
    document.getElementById('assignError').innerHTML = "Please pick a person"
    return;
    
  } 
  if (dueDate.valueOf() =='' ){
    document.getElementById('dateError').innerHTML = "Please pick a date"
    return;
    
  } 

  
  else{
    document.getElementById('dateError').innerHTML ='';
    document.getElementById('descriptionError').innerHTML = '';
    document.getElementById('assignError').innerHTML = '';
    document.getElementById('taskError').innerHTML = '';
    document.getElementById('statusError').innerHTML = '';
  }





   var taskstatus;

   for (var i = 0; i < status.length; i++) {
     if (status[i].checked) {
       taskstatus = status[i].value;
       break;
     }
   }
   if (!taskstatus) {
    event.preventDefault();

   document.getElementById('statusError').innerHTML = "Please choose a status</br>"
    return;
   }

  if (taskName.split(' ').length > 200) {
    alert('Message exceeds the word limit of 200 words.');
    return;
  }

 
  var userInput = {
    id: stroringData.length,
    name: taskName,
    description: taskDescription,
    assign: assignTo,
    date: dueDate,
    status: taskstatus,
    


  };


  stroringData.push(userInput);

   // Store the JSON string in local storage
   localStorage.setItem('formData', JSON.stringify(stroringData));


  form.reset();
  renderTasks();

}


function renderTasks() {
  taskParent.innerHTML = "";
  for (var i = 0; i < stroringData.length; i++) {
    var id = i;
    var task = stroringData[i];

    let markDoneBtn = "";

    if (task.status !== "done") {
      markDoneBtn = `<button class="done-button" data-task-id="${id}" onclick="markAsDone(${id})">Mark as done</button>`;
    } else {
      markDoneBtn = `<button class="done-button" data-task-id="${id}" style="display: none;">Mark as done</button>`;
    }

    let newUserhtml = `
      <div id="task-${id}" class="col col-xs-12 col-sm-12 col-md-4 col-lg-4">
      <div class="card m-auto text-white bg-success mb-3" style="max-width: 18rem;">
        <div class="card-header">Task ${id+1}</div>
        <div id = "storingData" class="card-body">
          
          <p class="card-text">Name: ${task.name}</p>
          <p class="card-text">Description: ${task.description}</p>
          <p class="card-text">Assigned to: ${task.assign}</p>
          <p class="card-text">Due Date: ${task.date}</p>
          <p class="card-text">Status: ${task.status}</p>
          <button class="delete-button btn btn-danger btn-sm" data-task-id="${id}">DELETE</button>
          <button class="done-button btn btn-danger btn-sm" data-task-id="${task.id}" onclick="markAsDone(${task.id})">Mark as done</button>

        </div>
      </div>
    </div>
      `

    taskParent.innerHTML += newUserhtml;
  }
  var deleteButtons = document.getElementsByClassName("delete-button");
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', deleteTask);
  }

  var markDoneButtons = document.getElementsByClassName("done-button");
  for (var i = 0; i < markDoneButtons.length; i++) {
    var taskId = markDoneButtons[i].getAttribute("data-task-id");
    var task = stroringData.find(task => task.id == taskId);
    if (task && task.status === "done") {
      markDoneButtons[i].style.display = "none";
    }
  }

}

function deleteTask(event) {
  var taskId = event.target.getAttribute("data-task-id");
  stroringData.splice(taskId, 1);

  localStorage.setItem('formData', JSON.stringify(stroringData));
  
  renderTasks();
}
function markAsDone(taskId) {
  // Find the task by taskId in the storingData array
  var task = stroringData.find(task => task.id === taskId);
console.log(task.status);

  if (task) {
    // Update the status in the array
    task.status = "done";

    // Update the status in the UI
    const taskElement = document.getElementById(`task-${taskId}`);
    console.log(taskElement);
    if (taskElement) {
    
      taskElement.querySelector("p.card-text:nth-child(5)").innerHTML = `Status: ${task.status}`;
    
     const markDoneButton = taskElement.querySelector(".done-button");
      if (markDoneButton) {
        console.log(markDoneButton);
        markDoneButton.style.display = "none";
       
      }
    }
    localStorage.setItem('formData', JSON.stringify(stroringData));
  }
}


// Initial rendering
renderTasks();


  




 
