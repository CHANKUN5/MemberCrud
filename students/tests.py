from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Estudiantes


class EstudiantesAPITests(APITestCase):

    def setUp(self):
        # Este método crea un estudiante de prueba y define las URLs
        self.estudiante = Estudiantes.objects.create(
            nombre_est="Django",
            apellido_paterno_est="API",
            apellido_materno_est="REST",
            email_est="Django@gmail.com",
            nota_est=85.0
        )

        # URL para listar y crear estudiantes
        self.list_url = reverse('estudiantes-list')
        
        # Función que genera la URL para acceder a un estudiante por su ID
        self.detail_url = lambda pk: reverse('estudiantes-detail', args=[pk])

    def test_create_estudiante(self):
        # Prueba la creación de un nuevo estudiante vía POST
        data = {
            "nombre_est": "Prueba",
            "apellido_paterno_est": "Test",
            "apellido_materno_est": "Tests",
            "email_est": "test@gmail.com",
            "nota_est": 20
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Estudiantes.objects.count(), 2)
        self.assertEqual(Estudiantes.objects.get(id=response.data['id']).nombre_est, "Prueba")

    def test_list_estudiantes(self):
        # Prueba que se puedan listar los estudiantes existentes vía GET
        response = self.client.get(self.list_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_estudiante(self):
        # Prueba obtener un estudiante específico usando su ID
        response = self.client.get(self.detail_url(self.estudiante.id), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email_est'], self.estudiante.email_est)

    def test_update_estudiante(self):
        # Prueba una actualización completa (PUT) del estudiante
        data = {
            "nombre_est": "Django Editado",
            "apellido_paterno_est": "API",
            "apellido_materno_est": "REST",
            "email_est": "Django@gmail.com",  # Mismo email
            "nota_est": 15
        }

        response = self.client.put(self.detail_url(self.estudiante.id), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.estudiante.refresh_from_db()
        self.assertEqual(self.estudiante.nota_est, 15)

    def test_partial_update_estudiante(self):
        # Prueba una actualización parcial (PATCH), modificando solo un campo
        data = {"nota_est": 12}
        response = self.client.patch(self.detail_url(self.estudiante.id), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.estudiante.refresh_from_db()
        self.assertEqual(self.estudiante.nota_est, 12)

    def test_delete_estudiante(self):
        # Prueba la eliminación de un estudiante con DELETE
        response = self.client.delete(self.detail_url(self.estudiante.id), format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Estudiantes.objects.count(), 0)

    def test_duplicate_email_not_allowed(self):
        # Prueba que no se puedan crear dos estudiantes con el mismo email
        data = {
            "nombre_est": "Otro",
            "apellido_paterno_est": "Apellido1",
            "apellido_materno_est": "Apellido2",
            "email_est": "Django@gmail.com",  # Email duplicado
            "nota_est": 70.0
        }

        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email_est', response.data)