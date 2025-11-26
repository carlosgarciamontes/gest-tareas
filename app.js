let tasks = [];

function addTask(title, description, dueDate) {

let task = {

    id: Date.now(),
    title: title,
    description: description,
    dueDate: dueDate,
    completed: false
    }
    tasks.push(task);
    console.log(tasks);
}



function deleteTask(taskId) {
    console.log('Eliminando tarea con ID:', taskId);
    console.log('Tasks antes:', tasks);
    
    tasks = tasks.filter(task => task.id !== taskId);
    
    console.log('Tasks después:', tasks);
    renderTasks();
}

function renderTasks() {

  const taskList = document.getElementById('task-list');  

  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    const borrar = document.createElement('button');

    li.textContent = task.title;
    li.classList.add('bg-blue-100', 'p-2');    
    
    borrar.textContent = "Eliminar tarea";
    borrar.classList.add('bg-red-400', 'py-1', 'px-2', 'rounded-full', 'text-white', 'ml-2');
    borrar.id ='deleteButton';
    
     borrar.addEventListener('click', function() {
        deleteTask(task.id);  // ← ¡Aquí la llamas!
    });

    li.appendChild(borrar);
    taskList.appendChild(li); 
    




  }

  )
}

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const titleInput = document.getElementById('task-title').value;
    const descriptionInput = document.getElementById('task-description').value;
    const dueDateInput = document.getElementById('task-due-date').value;

    console.log(titleInput+descriptionInput+dueDateInput);

    addTask(titleInput, descriptionInput, dueDateInput)
    renderTasks();

    document.getElementById('task-form').reset();
    
});


