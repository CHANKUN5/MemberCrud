import { useState } from 'react'
import { UserPlus, Loader2 } from 'lucide-react'

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.nombre_est.trim()) {
      newErrors.nombre_est = 'El nombre es requerido'
    }
    
    if (!formData.apellido_paterno_est.trim()) {
      newErrors.apellido_paterno_est = 'El apellido paterno es requerido'
    }
    
    if (!formData.apellido_materno_est.trim()) {
      newErrors.apellido_materno_est = 'El apellido materno es requerido'
    }
    
    if (!formData.email_est.trim()) {
      newErrors.email_est = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_est)) {
      newErrors.email_est = 'Email inválido'
    }
    
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setSubmitting(true)
    
    try {
      const submitData = {
        ...formData,
        nota_est: parseFloat(formData.nota_est)
      }
      
      await onSubmit(submitData)
      
      setFormData({
        nombre_est: '',
        apellido_paterno_est: '',
        apellido_materno_est: '',
        email_est: '',
        nota_est: ''
      })
      setErrors({})
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <div className="form-row">
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
            placeholder="Ingresa el nombre"
            disabled={submitting}
          />
          {errors.nombre_est && (
            <span className="error-message">{errors.nombre_est}</span>
          )}
        </div>
      </div>

      <div className="form-row">
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
            placeholder="Ingresa el apellido paterno"
            disabled={submitting}
          />
          {errors.apellido_paterno_est && (
            <span className="error-message">{errors.apellido_paterno_est}</span>
          )}
        </div>
      </div>

      <div className="form-row">
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
            placeholder="Ingresa el apellido materno"
            disabled={submitting}
          />
          {errors.apellido_materno_est && (
            <span className="error-message">{errors.apellido_materno_est}</span>
          )}
        </div>
      </div>

      <div className="form-row">
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
            placeholder="ejemplo@correo.com"
            disabled={submitting}
          />
          {errors.email_est && (
            <span className="error-message">{errors.email_est}</span>
          )}
        </div>
      </div>

      <div className="form-row">
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
            <span className="error-message">{errors.nota_est}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary btn-submit"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="loading" />
            Guardando...
          </>
        ) : (
          <>
            <UserPlus size={16} />
            Agregar Estudiante
          </>
        )}
      </button>
    </form>
  )
}

export default StudentForm