import axios from 'axios'

const API_URL = 'http://localhost:5000/tasks/'

const createTask = async(taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, taskData, config)

    return response.data
}

const getTask = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteTask = async(id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + `delete/${id}`, config)

    return response.data
}

const taskService = {
    createTask,
    getTask,
    deleteTask
}
export default taskService