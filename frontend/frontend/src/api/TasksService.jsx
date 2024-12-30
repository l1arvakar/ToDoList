import { fetchWithAuth } from '../api/auth';
import Cookies from "js-cookie";
const API_URL_TASKS = 'http://localhost:8080/api/tasks';

export const getTasks = async () => {
    try {
        const response = await fetchWithAuth(API_URL_TASKS);

        if (!response.ok) {
            throw new Error(`Error fetching tasks: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const getTasksByUser = async () => {
    try {
        const storedUser = await JSON.parse(Cookies.get('user'));
        const url = `${API_URL_TASKS}/user/${storedUser.id}`;
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching tasks: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        console.log(url);
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const getProductsByCategory = async (categoryId) => {
    const url = `${API_URL_TASKS}/category/${categoryId}`;
    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching tasks: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const getTask = async (taskId) => {
    const url = `${API_URL_TASKS}/${taskId}`;

    try {
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error(`Error fetching task by ID: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        console.log('create');
        const response = await fetchWithAuth(API_URL_TASKS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`Error adding task: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding task:', error);
        throw error;
    }
};

export const updateTaskById = async (task) => {
    console.log('update');
    const taskId = task.id;
    const url = `${API_URL_TASKS}/${taskId}`;
    console.log(task);
    try {
        const response = await fetchWithAuth(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!response.ok) {
            throw new Error(`Error updating task: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTaskById = async (taskId) => {
    const url = `${API_URL_TASKS}/${taskId}`;

    try {
        const response = await fetchWithAuth(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error deleting task: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};