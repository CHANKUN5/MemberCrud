import { useState } from 'react'
import { Search, Edit2, Trash2, Save, X, Users, Loader2 } from 'lucide-react'
import DeleteModal from './DeleteModal'
import './StudentList.css'

function StudentList({ students, loading, onUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editGrade, setEditGrade] = useState('')
  const [updating, setUpdating] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ show: false, student: null })
  const [deleting, setDeleting] = useState(false)
  
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
    if (!editGrade || isNaN(parseFloat(editGrade))) return
    const newGrade = parseFloat(editGrade)
    if (newGrade < 0 || newGrade > 20) return
    
    setUpdating(true)
    try {
      await onUpdate(student.id, { nota_est: newGrade })
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
    if (!deleteModal.student) return
    setDeleting(true)
    try {
      await onDelete(deleteModal.student.id)
      setDeleteModal({ show: false, student: null })
    } catch (error) {
      console.error('Error deleting student:', error)
    } finally {
      setDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    if (!deleting) setDeleteModal({ show: false, student: null })
  }

  const getGradeBadgeClass = (grade) => {
    if (grade >= 16) return 'bg-green-100 text-green-800'
    if (grade >= 11) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getGradeStatus = (grade) => {
    if (grade >= 16) return 'Excelente'
    if (grade >= 11) return 'Aprobado'
    return 'Desaprobado'
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 size={32} className="animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Cargando estudiantes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="mb-6 border-b pb-4">
          <p className="text-gray-600 text-sm mt-1">
            Gestiona los estudiantes registrados ({students.length} total)
          </p>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar estudiantes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Si no hay resultados */}
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <Users size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {students.length === 0 
                ? 'No hay estudiantes registrados'
                : 'No se encontraron estudiantes'
              }
            </h3>
            <p className="text-gray-600">
              {students.length === 0
                ? 'Comienza agregando tu primer estudiante usando el formulario.'
                : 'Prueba con otros términos de búsqueda.'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Estudiante</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Nota</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b last:border-none hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {student.nombre_est} {student.apellido_paterno_est}
                        </div>
                        <div className="text-sm text-gray-500">
                          {student.apellido_materno_est}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-800">{student.email_est}</td>
                    <td className="py-3 px-4">
                      {editingId === student.id ? (
                        <input
                          type="number"
                          value={editGrade}
                          onChange={(e) => setEditGrade(e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0"
                          max="20"
                          step="0.1"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(student)
                            else if (e.key === 'Escape') cancelEdit()
                          }}
                        />
                      ) : (
                        <div className="font-medium">{student.nota_est.toFixed(1)}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeBadgeClass(student.nota_est)}`}>
                        {getGradeStatus(student.nota_est)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {editingId === student.id ? (
                          <>
                            <button
                              onClick={() => saveEdit(student)}
                              disabled={updating}
                              className="p-1 text-green-600 hover:bg-green-50 rounded-md disabled:opacity-50 transition"
                              title="Guardar cambios"
                            >
                              {updating ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                            </button>
                            <button
                              onClick={cancelEdit}
                              disabled={updating}
                              className="p-1 text-gray-600 hover:bg-gray-50 rounded-md disabled:opacity-50 transition"
                              title="Cancelar edición"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(student)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded-md transition"
                              title="Editar nota"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(student)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded-md transition"
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

      {deleteModal.show && (
        <DeleteModal
          student={deleteModal.student}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          loading={deleting}
        />
      )}
    </>
  )
}

export default StudentList
