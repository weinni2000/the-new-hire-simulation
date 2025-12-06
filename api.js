// API Helper Functions
// Note: This is a mock API for demonstration

const API_BASE = '/api';

// Mock API calls - in real app, these would call actual endpoints
async function apiLogin(username, password) {
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock validation
    if (username === 'admin' && password === 'password') {
        return { success: true, user: { name: username } };
    }
    return { success: false, error: 'Invalid credentials' };
}

async function apiGetTasks() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, tasks: [] };
}

async function apiSaveTask(task) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true, task };
}

async function apiDeleteTask(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
}
