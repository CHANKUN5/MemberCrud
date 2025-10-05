<div align="center">

# 🎓 MemberCrud – Gestión de Estudiantes  

<p>
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/Django-4.x-092E20?logo=django&logoColor=white&style=for-the-badge" />
  <img src="https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white&style=for-the-badge" />
</p>

</div>

---

## 👥 Equipo de Desarrollo (SCRUM)

| Rol | Integrante |
|-----|------------|
| Scrum Master | Kassandra Castro |
| Product Owner | Leonardo Huaracha |
| Frontend | Diego Saravia<br>Leonardo Huaracha |
| Backend | Fabiano Anticona<br>Jared Fernandez |

---

## 📖 Descripción  

**MemberCrud** es una aplicación **Full Stack** que permite la **gestión completa de estudiantes** mediante operaciones CRUD (Crear, Leer, Actualizar y Eliminar).  

El sistema está construido con un **frontend moderno en React** y un **backend robusto en Django REST Framework**, garantizando una experiencia rápida, escalable y fácil de usar.  

Este proyecto fue desarrollado como práctica de integración **frontend + backend**, aplicando buenas prácticas de desarrollo, diagramación UML y control de versiones con Git y GitHub.  

---

## ✨ Funcionalidades  

✅ Registro de estudiantes con validación de datos.  
✅ Edición de información en tiempo real.  
✅ Eliminación de estudiantes con confirmación mediante modal.  
✅ Listado dinámico y filtrado.  
✅ Conexión **API REST** entre React y Django.  

---

## 🛠️ Tecnologías Usadas  

- **Frontend:** React + Vite  
- **Estilos:** CSS modularizado  
- **Backend:** Django + Django REST Framework  
- **Base de Datos:** SQLite  
- **Control de Versiones:** Git & GitHub  

---

## 📊 Diagramas del Proyecto  

### 🔹 Diagrama de Actividades  

![Diagrama para Gestion de Estudiantes_page-0001](https://github.com/user-attachments/assets/ce76789c-6fbe-4437-9edc-5a1bc9010540)

### 🔹 Diagrama de Clases (DCN)  

![DCUN](https://github.com/user-attachments/assets/f32fcd4a-ebce-47da-b70e-2668a3131079)

---

## 🚀 Instalación y Ejecución  

### 🔧 Backend (Django)
```bash
# 1. Crear entorno virtual
python -m venv venv

# 2. Activar entorno
# Linux / Mac
source venv/bin/activate
# Windows
venv\Scripts\activate

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Migrar la base de datos
python manage.py migrate

# 5. Levantar el servidor
python manage.py runserver
