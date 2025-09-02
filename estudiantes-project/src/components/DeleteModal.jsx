import { AlertTriangle } from 'lucide-react'

function DeleteModal({ student, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon danger">
            <AlertTriangle size={24} />
          </div>
          <h3>Confirmar Eliminación</h3>
          <p>Esta acción no se puede deshacer</p>
        </div>
        
        <div className="modal-body">
          <p>
            ¿Estás seguro de que deseas eliminar al estudiante <strong>{student?.nombre_est} {student?.apellido_paterno_est} {student?.apellido_materno_est}</strong>?
          </p>
          <div className="student-details">
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{student?.email_est}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Nota:</span>
              <span className="detail-value">{student?.nota_est?.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-danger"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal