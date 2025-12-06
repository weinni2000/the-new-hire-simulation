// TaskMaster Application
// WARNING: This code has INTENTIONAL BUGS for training purposes

let tasks = [];
let currentFilter = 'all';
let isLoggedIn = false;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('task-form').addEventListener('submit', handleAddTask);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    document.getElementById('clear-completed').addEventListener('click', clearCompletedTasks);
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Load tasks from localStorage
    loadTasks();
}

// BUG #1: Login throws 500 error - missing input validation
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // BUG: No null/empty check causes error
    if (username.length < 1) {  // This should check for empty string properly
        // BUG: This error is not displayed to user properly
        throw new Error("Username cannot be empty");  // This crashes instead of showing error
    }
    
    // BUG: Password validation missing entirely
    // TODO: Add password validation
    
    // Simulate login
    isLoggedIn = true;
    showApp();
}

// BUG #6: Logout doesn't work - missing implementation
function handleLogout() {
    // TODO: Implement logout functionality
    console.log("Logout clicked");  // Only logs, doesn't actually logout
    // isLoggedIn = false;
    // showLogin();
}

function showApp() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('app-section').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('app-section').classList.add('hidden');
}

// BUG #3: Add task has no validation
function handleAddTask(e) {
    e.preventDefault();
    
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('task-due-date');
    const priorityInput = document.getElementById('task-priority');
    
    // BUG: No validation - allows empty tasks
    const task = {
        id: Date.now(),
        text: taskInput.value,  // Can be empty!
        dueDate: dueDateInput.value,
        priority: priorityInput.value,
        completed: false
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    
    // BUG #4: Form doesn't clear after submit
    // taskInput.value = '';  // Commented out - form doesn't reset
}

// BUG #5: Delete task has wrong logic
function deleteTask(id) {
    // BUG: Uses wrong comparison - string vs number
    tasks = tasks.filter(task => task.id != id);  // Should use strict equality
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// BUG #7: Filter doesn't work properly
function handleFilter(e) {
    const filter = e.target.dataset.filter;
    currentFilter = filter;
    
    // BUG: Only updates visual state, doesn't re-render tasks
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // TODO: Call renderTasks() here
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    
    // BUG #7 continued: Filter logic exists but isn't called from handleFilter
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
            <span class="task-text">${task.text}</span>
            <span class="task-priority priority-${task.priority}">${task.priority}</span>
            <span class="task-due">${task.dueDate || 'No date'}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
    
    updateTaskCount();
}

// BUG #8: Task count shows wrong number
function updateTaskCount() {
    const totalCount = tasks.length;
    const completedCount = tasks.filter(t => t.completed).length;
    
    // BUG: Displays "tasks" even for 1 task (should be "task")
    document.getElementById('task-count').textContent = `${totalCount} tasks`;
    
    // BUG: Completed count doesn't update properly
    document.getElementById('completed-count').textContent = `${completedCount} completed`;
}

// BUG #11: Clear completed doesn't work
function clearCompletedTasks() {
    // BUG: Logic is inverted - keeps completed instead of removing them
    tasks = tasks.filter(t => t.completed);  // Wrong! Should be !t.completed
    saveTasks();
    renderTasks();
}

// BUG #12: LocalStorage not working properly
function saveTasks() {
    // BUG: Saves to wrong key
    localStorage.setItem('taskmaster_tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // BUG: Loads from different key than saveTasks
    const saved = localStorage.getItem('tasks');  // Should be 'taskmaster_tasks'
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
}
