from rest_framework import viewsets, status
from ..models import Digit
from .serializers import DigitSerializer

class DigitViewSet(viewsets.ModelViewSet):
    serializer_class=DigitSerializer
    queryset=Digit.objects.all()
    def create(self, request, *args, **kwargs):
        # Utilisez le comportement par défaut pour créer l'objet
        response = super(DigitViewSet, self).create(request, *args, **kwargs)
        
        # Si la création a réussi, personnalisez la réponse
        if response.status_code == status.HTTP_201_CREATED:
            created_digit = Digit.objects.get(pk=response.data['id'])
            response.data['result'] = created_digit.result
            response.data['confidence'] = created_digit.confidence
        
        return response