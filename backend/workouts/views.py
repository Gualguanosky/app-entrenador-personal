from rest_framework import viewsets, permissions
from .models import Exercise, DailyRoutine, RoutineExercise
from .serializers import ExerciseSerializer, DailyRoutineSerializer, RoutineExerciseSerializer
from datetime import date

class IsTrainerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.is_trainer

class ExerciseViewSet(viewsets.ModelViewSet):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer
    permission_classes = [IsTrainerOrReadOnly]

class DailyRoutineViewSet(viewsets.ModelViewSet):
    serializer_class = DailyRoutineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_trainer:
            return DailyRoutine.objects.all()
        return DailyRoutine.objects.filter(client=user)

    def perform_create(self, serializer):
        serializer.save(assigned_by=self.request.user)

class RoutineExerciseViewSet(viewsets.ModelViewSet):
    queryset = RoutineExercise.objects.all()
    serializer_class = RoutineExerciseSerializer
    permission_classes = [IsTrainerOrReadOnly]
