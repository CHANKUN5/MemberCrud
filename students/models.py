from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Estudiantes(models.Model):
    nombre_est = models.CharField(max_length=100, null=False, blank=False)
    apellido_paterno_est = models.CharField(max_length=100, null=False, blank=False)
    apellido_materno_est = models.CharField(max_length=100, null=False, blank=False)
    email_est = models.EmailField(unique=True, null=False, blank=False)
    nota_est = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(20.0)],null=False, blank=False)

    def __str__(self):
        return f"{self.nombre_est} {self.apellido_paterno_est}"
