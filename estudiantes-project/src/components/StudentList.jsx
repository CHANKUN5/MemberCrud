import { useState } from 'react'
import { Search, Edit2, Trash2, Save, X, Loader2, Users } from 'lucide-react'
import DeleteModal from './DeleteModal'

function StudentList({ students, loading, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editGrade, setEditGrade] = useState('')
  const [updating, setUpdating] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ show: false, student: null })

  const filteredStudents = students.filter(student =>
    student.nombre_est.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.apellido_paterno_est.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.apellido_materno_est.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email_est.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const startEdit = (student) => {
    setEditingId(student.id)
    setEditGrade(student.nota_est.toString())
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditGrade('')
  }

  const saveEdit = async (student) => {
    if (!editGrade || isNaN(parseFloat(editGrade))) {
      return
    }
    
    const newGrade = parseFloat(editGrade)
    if (newGrade < 0 || newGrade > 20) {
      return
    }
    
    setUpdating(true)
    
    try {
      await onUpdate(student.id, {
        ...student,
        nota_est: newGrade
      })
      setEditingId(null)
      setEditGrade('')
    } catch (error) {
      console.error('Error updating student:', error)
    } finally {
      setUpdating(false)
    }
  }

  const handleDeleteClick = (student) => {
    setDeleteModal({ show: true, student })
  }

  const handleDeleteConfirm = async () => {
    if (deleteModal.student) {
      await onDelete(deleteModal.student.id)
      setDeleteModal({ show: false, student: null })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, student: null })
  }

  const getGradeBadgeClass = (grade) => {
    if (grade >= 16) return 'badge-success'
    if (grade >= 11) return 'badge-warning'
    return 'badge-danger'
  }

  const getGradeStatus = (grade) => {
    if (grade >= 16) return 'Excelente'
    if (grade >= 11) return 'Aprobado'
    return 'Desaprobado'
  }

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h2>Lista de Estudiantes</h2>
          <p>Gestiona los estudiantes registrados</p>
        </div>
        <div className="card-body">
          <div className="loading-container">
            <Loader2 size={32} className="loading" />
            <p>Cargando estudiantes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>Lista de Estudiantes</h2>
          <p>Gestiona los estudiantes registrados ({students.length} total)</p>
        </div>
        <div className="card-body">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input search-input"
            />
          </div>

          {filteredStudents.length === 0 ? (
            <div className="no-data">
              <Users size={48} />
              <h3>
                {students.length === 0 
                  ? 'No hay estudiantes registrados'
                  : 'No se encontraron estudiantes'
                }
              </h3>
              <p>
                {students.length === 0
                  ? 'Comienza agregando tu primer estudiante usando el formulario de la izquierda.'
                  : 'Intenta con otros términos de búsqueda.'
                }
              </p>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Email</th>
                    <th>Nota</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>
                        <div className="student-info">
                          <div className="student-name">
                            {student.nombre_est} {student.apellido_paterno_est}
                          </div>
                          <div className="student-lastname">
                            {student.apellido_materno_est}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="student-email">
                          {student.email_est}
                        </div>
                      </td>
                      <td>
                        {editingId === student.id ? (
                          <div className="edit-grade-container">
                            <input
                              type="number"
                              value={editGrade}
                              onChange={(e) => setEditGrade(e.target.value)}
                              className="form-input grade-input"
                              min="0"
                              max="20"
                              step="0.1"
                              autoFocus
                            />
                          </div>
                        ) : (
                          <div className="grade-display">
                            {student.nota_est.toFixed(1)}
                          </div>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${getGradeBadgeClass(student.nota_est)}`}>
                          {getGradeStatus(student.nota_est)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {editingId === student.id ? (
                            <>
                              <button
                                onClick={() => saveEdit(student)}
                                disabled={updating}
                                className="btn btn-success btn-sm"
                                title="Guardar cambios"
                              >
                                {updating ? (
                                  <Loader2 size={14} className="loading" />
                                ) : (
                                  <Save size={14} />
                                )}
                              </button>
                              <button
                                onClick={cancelEdit}
                                disabled={updating}
                                className="btn btn-secondary btn-sm"
                                title="Cancelar edición"
                              >
                                <X size={14} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(student)}
                                className="btn btn-secondary btn-sm"
                                title="Editar nota"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(student)}
                                className="btn btn-danger btn-sm"
                                title="Eliminar estudiante"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {deleteModal.show && (
        <DeleteModal
          student={deleteModal.student}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  )
}

export default StudentList