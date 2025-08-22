let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskList = document.getElementById('task-list');
const filterStatus = document.getElementById('filter-status');
const filterDate = document.getElementById('filter-date');
const createTaskElement = (task) => {
    const li = document.createElement('li');
    li.className = `task-item bg-white p-4 rounded-lg shadow-md mb-4 flex items-center gap-4`;
    
    li.innerHTML = `
        <input type="checkbox" class="w-6 h-6 rounded-lg" ${task.completed ? 'checked' : ''}>
        <div class="flex-1">
            <div class="text-lg font-medium ${task.completed ? 'line-through text-gray-400' : ''}">${task.text}</div>
            <div class="text-sm text-gray-500">📅 ${task.date}</div>
        </div>
        <button class="delete-btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg">
            <i class="fas fa-trash"></i>
        </button>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    const textDiv = li.querySelector('.text-lg');
    
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        textDiv.classList.toggle('line-through');
        textDiv.classList.toggle('text-gray-400');
        saveTasks();
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        tasks = tasks.filter(t => t !== task);
        saveTasks();
    });

    return li;
};
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const renderTasks = () => {
    taskList.innerHTML = '';
    let filteredTasks = [...tasks];

    if (filterStatus.value !== 'all') {
        const isCompleted = filterStatus.value === 'completed';
        filteredTasks = filteredTasks.filter(task => task.completed === isCompleted);
    }

    if (filterDate.value) {
        filteredTasks = filteredTasks.filter(task => task.date === filterDate.value);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="text-center text-gray-500 py-4">Tidak ada tugas</li>';
        return;
    }

    filteredTasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
};
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const text = taskInput.value.trim();
    const date = dateInput.value;

    if (!text || !date) {
        alert('Mohon isi semua field!');
        return;
    }

    const newTask = { text, date, completed: false };
    tasks.push(newTask);
    
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    dateInput.value = '';
});

filterStatus.addEventListener('change', renderTasks);
filterDate.addEventListener('change', renderTasks);
renderTasks();
