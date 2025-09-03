import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

// Interceptor para manejo de errores globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    
    // Manejar diferentes tipos de errores
    if (error.response?.status === 404) {
      throw new Error('Recurso no encontrado')
    } else if (error.response?.status === 400) {
      throw new Error('Datos inválidos')
    } else if (error.response?.status >= 500) {
      throw new Error('Error del servidor')
    } else if (error.code === 'ECONNREFUSED') {
      throw new Error('No se puede conectar al servidor. Verifica que esté ejecutándose.')
    }
    
    throw error
  }
)

export const getStudents = async () => {
  try {
    const response = await api.get('/students/')
    return response.data
  } catch (error) {
    console.error('Error fetching students:', error)
    throw error
  }
}

export const createStudent = async (studentData) => {
  try {
    const response = await api.post('/students/', studentData)
    return response.data
  } catch (error) {
    console.error('Error creating student:', error)
    throw error
  }
}

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}/`, studentData)
    return response.data
  } catch (error) {
    console.error('Error updating student:', error)
    throw error
  }
}

export const updateStudentPartial = async (id, studentData) => {
  try {
    const response = await api.patch(`/students/${id}/`, studentData)
    return response.data
  } catch (error) {
    console.error('Error partially updating student:', error)
    throw error
  }
}

export const deleteStudent = async (id) => {
  try {
    console.log('Deleting student with ID:', id)
    await api.delete(`/students/${id}/`)
    console.log('Student deleted successfully from API')
  } catch (error) {
    console.error('Error deleting student:', error)
    throw error
  }
}