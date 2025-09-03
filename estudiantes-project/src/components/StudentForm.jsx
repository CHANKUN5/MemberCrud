import { useState } from 'react'
import { UserPlus, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import './StudentForm.css'
function StudentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nombre_est: '',
    apellido_paterno_est: '',
    apellido_materno_est: '',
    email_est: '',
    nota_est: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validar nombre
    if (!formData.nombre_est.trim()) {
      newErrors.nombre_est = 'El nombre es requerido'
    } else if (formData.nombre_est.trim().length < 2) {
      newErrors.nombre_est = 'El nombre debe tener al menos 2 caracteres'
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.nombre_est.trim())) {
      newErrors.nombre_est = 'El nombre solo puede contener letras y espacios'
    }
    
    // Validar apellido paterno
    if (!formData.apellido_paterno_est.trim()) {
      newErrors.apellido_paterno_est = 'El apellido paterno es requerido'
    } else if (formData.apellido_paterno_est.trim().length < 2) {
      newErrors.apellido_paterno_est = 'El apellido debe tener al menos 2 caracteres'
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellido_paterno_est.trim())) {
      newErrors.apellido_paterno_est = 'El apellido solo puede contener letras y espacios'
    }
    
    // Validar apellido materno
    if (!formData.apellido_materno_est.trim()) {
      newErrors.apellido_materno_est = 'El apellido materno es requerido'
    } else if (formData.apellido_materno_est.trim().length < 2) {
      newErrors.apellido_materno_est = 'El apellido debe tener al menos 2 caracteres'
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.apellido_materno_est.trim())) {
      newErrors.apellido_materno_est = 'El apellido solo puede contener letras y espacios'
    }
    
    // Validar email
    if (!formData.email_est.trim()) {
      newErrors.email_est = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_est.trim())) {
      newErrors.email_est = 'Formato de email inválido'
    }
    
    // Validar nota
    if (!formData.nota_est) {
      newErrors.nota_est = 'La nota es requerida'
    } else {
      const nota = parseFloat(formData.nota_est)
      if (isNaN(nota) || nota < 0 || nota > 20) {
        newErrors.nota_est = 'La nota debe estar entre 0 y 20'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setFormData({
      nombre_est: '',
      apellido_paterno_est: '',
      apellido_materno_est: '',
      email_est: '',
      nota_est: ''
    })
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setSubmitting(true)
    
    try {
      const submitData = {
        ...formData,
        nombre_est: formData.nombre_est.trim(),
        apellido_paterno_est: formData.apellido_paterno_est.trim(),
        apellido_materno_est: formData.apellido_materno_est.trim(),
        email_est: formData.email_est.trim().toLowerCase(),
        nota_est: parseFloat(formData.nota_est)
      }
      
      await onSubmit(submitData)
      
      resetForm()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      {showSuccess && (
        <div className="alert alert-success">
          <CheckCircle size={16} />
          ¡Estudiante creado exitosamente!
        </div>
      )}

      <div className="form-group">
        <label htmlFor="nombre_est" className="form-label">
          Nombre *
        </label>
        <input
          type="text"
          id="nombre_est"
          name="nombre_est"
          value={formData.nombre_est}
          onChange={handleChange}
          className={`form-input ${errors.nombre_est ? 'error' : ''}`}
          placeholder="Ej: María José"
          disabled={submitting}
          maxLength={100}
        />
        {errors.nombre_est && (
          <span className="error-message">
            <AlertCircle size={14} />
            {errors.nombre_est}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="apellido_paterno_est" className="form-label">
          Apellido Paterno *
        </label>
        <input
          type="text"
          id="apellido_paterno_est"
          name="apellido_paterno_est"
          value={formData.apellido_paterno_est}
          onChange={handleChange}
          className={`form-input ${errors.apellido_paterno_est ? 'error' : ''}`}
          placeholder="Ej: García"
          disabled={submitting}
          maxLength={100}
        />
        {errors.apellido_paterno_est && (
          <span className="error-message">
            <AlertCircle size={14} />
            {errors.apellido_paterno_est}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="apellido_materno_est" className="form-label">
          Apellido Materno *
        </label>
        <input
          type="text"
          id="apellido_materno_est"
          name="apellido_materno_est"
          value={formData.apellido_materno_est}
          onChange={handleChange}
          className={`form-input ${errors.apellido_materno_est ? 'error' : ''}`}
          placeholder="Ej: López"
          disabled={submitting}
          maxLength={100}
        />
        {errors.apellido_materno_est && (
          <span className="error-message">
            <AlertCircle size={14} />
            {errors.apellido_materno_est}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email_est" className="form-label">
          Email *
        </label>
        <input
          type="email"
          id="email_est"
          name="email_est"
          value={formData.email_est}
          onChange={handleChange}
          className={`form-input ${errors.email_est ? 'error' : ''}`}
          placeholder="maria.garcia@ejemplo.com"
          disabled={submitting}
          maxLength={254}
        />
        {errors.email_est && (
          <span className="error-message">
            <AlertCircle size={14} />
            {errors.email_est}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="nota_est" className="form-label">
          Nota (0-20) *
        </label>
        <input
          type="number"
          id="nota_est"
          name="nota_est"
          value={formData.nota_est}
          onChange={handleChange}
          className={`form-input grade-input ${errors.nota_est ? 'error' : ''}`}
          placeholder="15.5"
          min="0"
          max="20"
          step="0.1"
          disabled={submitting}
        />
        {errors.nota_est && (
          <span className="error-message">
            <AlertCircle size={14} />
            {errors.nota_est}
          </span>
        )}
        <small style={{ 
          fontSize: '0.75rem', 
          color: 'var(--light-text-secondary)', 
          marginTop: '0.25rem', 
          display: 'block' 
        }}>
          Escala de 0 a 20 puntos (decimales permitidos)
        </small>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary btn-submit"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="loading" />
            Creando estudiante...
          </>
        ) : (
          <>
            <UserPlus size={18} />
            Agregar Estudiante
          </>
        )}
      </button>
    </form>
  )
}

export default StudentForm