let tasks = [];

document.addEventListener('DOMContentLoaded', function() {
    loadTasks(); // Cargar tareas
    
    setupFilterButtons();
});

function addTask(title, description, dueDate) {

let task = {

    id: Date.now(),
    title: title,
    description: description,
    dueDate: dueDate,
    completed: false
    }
    tasks.push(task);
    saveTasks();
    console.log(tasks);
}

let = currentFilter = "all";

function deleteTask(taskId) {
    console.log('Eliminando tarea con ID:', taskId);
    console.log('Tasks antes:', tasks);
    
    tasks = tasks.filter(task => task.id !== taskId);
    
    console.log('Tasks después:', tasks);
    saveTasks();
    renderTasks();

}

// Método híbrido - práctico y educativo
function createTaskItem(task) {
    const li = document.createElement('li');
    
    // HTML para estructura rápida
    li.innerHTML = `
        <div class="flex justify-between items-center bg-white p-4 border rounded-lg shadow-sm mb-2">
            <div class="flex-1">
                <h3 class="font-semibold text-lg">${task.title}</h3>
                <p class="text-gray-600 mt-1">${task.description}</p>
                <p class="text-gray-500 text-sm mt-1">📅 ${task.dueDate}</p>
            </div>
            <button class="btn-delete bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm transition duration-200 mx-4">
                Eliminar
            </button>
            <div class="flex flex-col items-center text-sm justify-center">
            <label for="check-${task.id}" class="block">Completado</label>
            <input id="check-${task.id}" type="checkbox" ${task.completed ? 'checked' : ''} class="size-8">
            </div>
        </div>
    `;
    
    // JavaScript puro para lógica
    const deleteBtn = li.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    // Estado completado/no completado

    const checkbox = li.querySelector(`#check-${task.id}`);
    checkbox.addEventListener('change', function() {
      const isChecked = this.checked;

      console.log(`Completado: ${isChecked}`);
      toggleComplete(task.id);
      
    });
    
    return li;
}

function renderTasks() {
    const taskList = document.getElementById('task-list');  
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
    })

    filteredTasks.forEach(task => {
        // ✅ DELEGA la creación a createTaskItem()
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    });
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

//Guardar y cargar tareas

function saveTasks() {
    // Convertir el array tasks a string y guardar en localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // Obtener datos de localStorage y convertirlos de vuelta a array
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

function toggleComplete(taskId) {
    // 1. Encontrar la tarea en el array
    const task = tasks.find(task => task.id === taskId);
    
    // 2. Si la tarea existe, cambiar su estado completed
    if (task) {
        task.completed = !task.completed;
        
        // 3. Guardar los cambios en localStorage
        saveTasks();
        
        // 4. Opcional: Re-renderizar para mostrar cambios visuales
        renderTasks();
    }
}

function setFilter (filterType) {
      currentFilter = filterType;
      renderTasks();
  
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Mapeo de colores para cada filtro
    const colorMap = {
        'all': 'blue',
        'pending': 'orange', 
        'completed': 'green'
    };

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterType = this.dataset.filter;
                const color = colorMap[filterType];
                setFilter(filterType);
                
                // Resetear todos los botones
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    const btnFilter = btn.dataset.filter;
                    const btnColor = colorMap[btnFilter];
                    
                    // Clases inactivas
                    btn.classList.remove(`bg-${btnColor}-500`, 'text-white');
                    btn.classList.add('bg-white', `text-${btnColor}-500`, `border-${btnColor}-500`);
                });
                
                // Clases activas
                this.classList.remove('bg-white', `text-${color}-500`);
                this.classList.add(`bg-${color}-500`, 'text-white');
            });
        });
    }
}