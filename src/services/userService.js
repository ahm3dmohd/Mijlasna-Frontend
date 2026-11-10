import api from './api'

async function getMe() {
    const response = await api.get('/users/me')
    return response.data
}

async function updateMe(formData) {
    const response = await api.put('/users/me', formData)
    return response.data
}

async function deleteMe() {
    const response = await api.delete('/users/me')
    return response.data
}

// admin only
async function getAllUsers() {
    const response = await api.get('/users')
    return response.data
}

async function getUserById(id) {
    const response = await api.get(`/users/${id}`)
    return response.data
}

async function updateUser(id, formData) {
    const response = await api.put(`/users/${id}`, formData)
    return response.data
}

async function deleteUser(id) {
    const response = await api.delete(`/users/${id}`)
    return response.data
}

export {
    getMe,
    updateMe,
    deleteMe,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
