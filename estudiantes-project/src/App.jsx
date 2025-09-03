import { useState, useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'
import './App.css'

import { getStudents, createStudent, updateStudentPartial, deleteStudent } from './api/students'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar estudiantes al iniciar
  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getStudents()
      setStudents(data)
    } catch (error) {
      console.error('Error loading students:', error)
      setError('Error al cargar los estudiantes. Verifica que el servidor esté ejecutándose.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateStudent = async (studentData) => {
    try {
      const newStudent = await createStudent(studentData)
      setStudents(prev => [...prev, newStudent])
      return newStudent
    } catch (error) {
      console.error('Error creating student:', error)
      setError('Error al crear el estudiante')
      throw error
    }
  }

  const handleUpdateStudent = async (id, studentData) => {
    try {
      const updatedStudent = await updateStudentPartial(id, studentData)
      setStudents(prev => prev.map(student => 
        student.id === id ? updatedStudent : student
      ))
      return updatedStudent
    } catch (error) {
      console.error('Error updating student:', error)
      setError('Error al actualizar el estudiante')
      throw error
    }
  }

  const handleDeleteStudent = async (id) => {
    try {
      await deleteStudent(id)
      setStudents(prev => prev.filter(student => student.id !== id))
    } catch (error) {
      console.error('Error deleting student:', error)
      setError('Error al eliminar el estudiante')
      throw error
    }
  }

  return (
    <div className="app-container">
      {/* Card del encabezado */}
      <div className="header-card">
        <h1>Sistema de Gestión de Estudiantes</h1>
        <p>Administra los estudiantes y sus calificaciones</p>
      </div>

      {/* Card de error (si existe) */}
      {error && (
        <div className="error-card">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)}>Cerrar</button>
        </div>
      )}

      {/* Grid principal con dos columnas en desktop */}
      <div className="main-grid">
        {/* Card del formulario */}
        <div className="form-card">
          <h2>Agregar Estudiante</h2>
          <StudentForm onSubmit={handleCreateStudent} />
        </div>

        {/* Card de la lista */}
        <div className="list-card">
          <h2>Lista de Estudiantes</h2>
          <StudentList 
            students={students}
            loading={loading}
            onUpdate={handleUpdateStudent}
            onDelete={handleDeleteStudent}
          />
        </div>
      </div>
    </div>
  )
}

export default App
