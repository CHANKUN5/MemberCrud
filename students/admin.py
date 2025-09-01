from django.contrib import admin
from .models import Estudiantes

@admin.register(Estudiantes)
class EstudiantesAdmin(admin.ModelAdmin):
    list_display = ('nombre_est', 'apellido_paterno_est', 'apellido_materno_est', 'email_est', 'nota_est')
    search_fields = ('nombre_est', 'apellido_paterno_est', 'email_est')
