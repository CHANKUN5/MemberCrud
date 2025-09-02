from rest_framework import serializers
from .models import Estudiantes

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiantes
        fields = '__all__'

    def validate_nombre_est(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("El nombre debe contener solo letras, sin espacios ni números.")
        return value

    def validate_apellido_paterno_est(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("El apellido paterno debe contener solo letras, sin espacios ni números.")
        return value

    def validate_apellido_materno_est(self, value):
        if not value.isalpha():
            raise serializers.ValidationError("El apellido materno debe contener solo letras, sin espacios ni números.")
        return value

    def validate_nota_est(self, value):
        if not (0.0 <= value <= 20.0):
            raise serializers.ValidationError("La nota debe estar entre 0 y 20.")
        return value