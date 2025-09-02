import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const getStudents = async () => {
  const response = await api.get('/students/')
  return response.data
}

export const createStudent = async (studentData) => {
  const response = await api.post('/students/', studentData)
  return response.data
}

export const updateStudent = async (id, studentData) => {
  const response = await api.put(`/students/${id}/`, studentData)
  return response.data
}

export const updateStudentPartial = async (id, studentData) => {
  const response = await api.patch(`/students/${id}/`, studentData)
  return response.data
}

export const deleteStudent = async (id) => {
  await api.delete(`/students/${id}/`)
}