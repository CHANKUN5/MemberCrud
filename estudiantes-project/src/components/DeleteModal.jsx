import { AlertTriangle, Loader2 } from 'lucide-react'

function DeleteModal({ student, onConfirm, onCancel, loading = false }) {
  console.log('DeleteModal rendering with student:', student, 'loading:', loading)
     
  if (!student) {
    console.log('No student provided to DeleteModal')
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center mb-4">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Confirmar Eliminación</h3>
          <p className="text-sm text-gray-500">Esta acción no se puede deshacer</p>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-3">
            ¿Estás seguro de que deseas eliminar al estudiante{' '}
            <strong>{student?.nombre_est} {student?.apellido_paterno_est} {student?.apellido_materno_est}</strong>?
          </p>
          <div className="bg-gray-50 p-3 rounded">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Email:</span>
              <span className="text-gray-900">{student?.email_est}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Nota:</span>
              <span className="text-gray-900">{student?.nota_est?.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Eliminando...
              </>
            ) : (
              'Eliminar'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal