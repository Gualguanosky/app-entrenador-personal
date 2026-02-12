from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExerciseViewSet, DailyRoutineViewSet, RoutineExerciseViewSet

router = DefaultRouter()
router.register(r'exercises', ExerciseViewSet)
router.register(r'routines', DailyRoutineViewSet, basename='dailyroutine')
router.register(r'routine-exercises', RoutineExerciseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
