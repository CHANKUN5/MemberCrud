from django.db import models

class Estudiantes(models.Model):
    nombre_est = models.TextField(null=False)
    apellido_paterno_est = models.TextField(null=False)
    apellido_materno_est = models.TextField(null=False)
    email_est = models.EmailField(unique=True, null=False)
    nota_est = models.FloatField(null=False)

    def __str__(self):
        return f"{self.nombre_est} {self.apellido_paterno_est}"
