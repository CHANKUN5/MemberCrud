import { useState, useEffect } from 'react'
import { Moon, Sun, Users, TrendingUp, Award, BookOpen } from 'lucide-react'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'
import * as studentService from './services/studentService'
import './App.css'

function App() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode'
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setLoading(true)
      const data = await studentService.getStudents()
      setStudents(data)
    } catch (err) {
      setError('Error al cargar los estudiantes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateStudent = async (studentData) => {
    try {
      await studentService.createStudent(studentData)
      setSuccess('Estudiante creado exitosamente')
      loadStudents()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.email_est?.[0] || 'Error al crear el estudiante')
      setTimeout(() => setError(''), 5000)
    }
  }

  const handleUpdateStudent = async (id, studentData) => {
    try {
      await studentService.updateStudent(id, studentData)
      setSuccess('Estudiante actualizado exitosamente')
      loadStudents()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Error al actualizar el estudiante')
      setTimeout(() => setError(''), 5000)
    }
  }

  const handleDeleteStudent = async (id) => {
    try {
      await studentService.deleteStudent(id)
      setSuccess('Estudiante eliminado exitosamente')
      loadStudents()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Error al eliminar el estudiante')
      setTimeout(() => setError(''), 5000)
    }
  }

  const getStats = () => {
    const totalStudents = students.length
    const averageGrade = students.length > 0 
      ? (students.reduce((sum, student) => sum + student.nota_est, 0) / students.length).toFixed(1)
      : 0
    const passedStudents = students.filter(student => student.nota_est >= 11).length
    const topStudent = students.length > 0 
      ? Math.max(...students.map(student => student.nota_est))
      : 0

    return { totalStudents, averageGrade, passedStudents, topStudent }
  }

  const stats = getStats()

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="header-title">
              <BookOpen size={32} className="header-icon" />
              <div>
                <h1>Sistema de Gestión Estudiantil</h1>
                <p>Administra estudiantes y calificaciones</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-secondary theme-toggle"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          
          {success && (
            <div className="alert alert-success">
              {success}
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-value">{stats.totalStudents}</div>
              <div className="stat-label">Total Estudiantes</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-value">{stats.averageGrade}</div>
              <div className="stat-label">Promedio General</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Award size={24} />
              </div>
              <div className="stat-value">{stats.passedStudents}</div>
              <div className="stat-label">Estudiantes Aprobados</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <BookOpen size={24} />
              </div>
              <div className="stat-value">{stats.topStudent}</div>
              <div className="stat-label">Mejor Calificación</div>
            </div>
          </div>

          <div className="content-grid">
            <div className="form-section">
              <div className="card">
                <div className="card-header">
                  <h2>Nuevo Estudiante</h2>
                  <p>Registra un nuevo estudiante en el sistema</p>
                </div>
                <div className="card-body">
                  <StudentForm onSubmit={handleCreateStudent} />
                </div>
              </div>
            </div>

            <div className="list-section">
              <StudentList
                students={students}
                loading={loading}
                onUpdate={handleUpdateStudent}
                onDelete={handleDeleteStudent}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Sistema de Gestión Estudiantil. Desarrollado con React y Django.</p>
        </div>
      </footer>
    </div>
  )
}

export default App