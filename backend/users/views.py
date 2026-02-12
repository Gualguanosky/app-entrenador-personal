from rest_framework import generics, permissions
from .models import CustomUser
from .serializers import UserSerializer

class ClientListView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.filter(is_trainer=False)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        # Trainers create clients. 
        # For simplicity, we just create a user. The frontend will handle setting is_trainer=False
        serializer.save()

class MyProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
