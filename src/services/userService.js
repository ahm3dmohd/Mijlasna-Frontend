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

export {
    getMe,
    updateMe,
    deleteMe
}
