from rest_framework.viewsets import ModelViewSet
from .models import Estudiantes
from .serializers import EstudianteSerializer

class EstudianteViewSet(ModelViewSet):
    queryset = Estudiantes.objects.all()
    serializer_class = EstudianteSerializer
