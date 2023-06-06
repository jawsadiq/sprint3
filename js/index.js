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
    // // Populate the form fields with the retrieved data
    // document.getElementById('name').value = stroringData.name;
    // document.getElementById('description').value = stroringData.description;
    // document.getElementById('assign').value = stroringData.assign;
    // document.getElementById('date').value = stroringData.date;
    // var statusRadios = document.getElementsByName('status');
    // for (var i = 0; i < statusRadios.length; i++) {
    //   if (statusRadios[i].value === stroringData.status) {
    //     statusRadios[i].checked = true;
    //   }
    // }
  


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
    let newUserhtml = `
      <div class="col col-xs-12 col-sm-12 col-md-4 col-lg-4">
      <div class="card m-auto text-white bg-success mb-3" style="max-width: 18rem;">
        <div class="card-header">Task ${id+1}</div>
        <div id = "storingData" class="card-body">
          
          <p class="card-text">Name: ${task.name}</p>
          <p class="card-text">Description: ${task.description}</p>
          <p class="card-text">Assigned to: ${task.assign}</p>
          <p class="card-text">Due Date: ${task.date}</p>
          <p class="card-text">Status: ${task.status}</p>
          <button class="delete-button btn btn-danger btn-sm" data-task-id="${id}">DELETE</button>
          

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
}

function deleteTask(event) {
  var taskId = event.target.getAttribute("data-task-id");
  stroringData.splice(taskId, 1);

  localStorage.setItem('formData', JSON.stringify(stroringData));
  
  renderTasks();
}

// Initial rendering
renderTasks();


  




 
